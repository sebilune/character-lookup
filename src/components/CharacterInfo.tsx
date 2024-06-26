import React, { useState, useCallback } from "react";

import CharacterName from "./CharacterName";
import SearchInput from "./SearchInput";
import SearchIcon from "./SearchIcon";
import Loading from "./Loading";

type Character = {
  name: {
    full: string;
    native: string; // Added for Japanese name
  };
  description: string;
  image: {
    large: string;
  };
  media?: {
    nodes: {
      title: {
        romaji: string;
      };
    }[];
  };
};

interface CharacterInfoProps {
  initialSearch?: string; // Optional initial search term
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({
  initialSearch = "",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCharacter = useCallback(async () => {
    if (!searchTerm) {
      setCharacter(null);
      return;
    }

    setLoading(true);

    const characterQuery = `
        query {
            Character(search: "${searchTerm}") {
                name {
                    full
                    native
                }
                description(asHtml: true)
                image {
                    large
                }
                media {
                    nodes {
                        title {
                            romaji
                        }
                    }
                }
            }
        }`;

    const url = "https://graphql.anilist.co";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: characterQuery }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.data && data.data.Character) {
        const characterData: Character = data.data.Character;
        setCharacter(characterData);
      } else {
        setCharacter(null);
      }
    } catch (error) {
      console.error("Error fetching character data:", error);
      setCharacter(null);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    fetchCharacter();
  };

  return (
    <>
      <h1>
        <a href="https://github.com/sebilune/character-lookup">
          Anime Character Lookup
        </a>
        <SearchIcon />
      </h1>
      <SearchInput
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearchClick}
      />
      <div className="character-details">
        {loading && <Loading />}
        {!loading && character && (
          <>
            <div className="left-panel">
              <div className="card">
                <div className="img-placeholder">
                  <img src={character.image.large} alt={character.name.full} />
                </div>
                <h2>
                  <CharacterName
                    characterName={character.name.full}
                    characterNativeName={character.name.native}
                  />
                </h2>
              </div>
            </div>
            <div className="right-panel">
              {character.media && character.media.nodes.length > 0 && (
                <h2>
                  From:{" "}
                  <a
                    href={`https://anilist.co/search/anime?search=${character.media.nodes[0].title.romaji}`}
                  >
                    {character.media.nodes[0].title.romaji}
                  </a>
                </h2>
              )}
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: character.description }}
              ></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CharacterInfo;
