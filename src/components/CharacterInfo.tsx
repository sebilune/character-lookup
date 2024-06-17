import React, { useState, useCallback } from "react";

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    fetchCharacter();
  };

  return (
    <div>
      <h1>
        <a href="https://github.com/sebilune/character-lookup">
          Anime Character Lookup
        </a>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke-width="0"></g>
          <g stroke-linecap="round" stroke-linejoin="round"></g>
          <g>
            {" "}
            <path
              opacity="0.1"
              d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              fill="#ffffff"
            ></path>{" "}
            <path
              d="M15 15L21 21"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#ffffff"
              stroke-width="2"
            ></path>{" "}
          </g>
        </svg>
      </h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a character..."
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchCharacter();
          }}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {!loading && character && (
          <>
            <h2>
              <img src={character.image.large} alt={character.name.full} />
            </h2>
            <h2>
              {character.name.full} ({character.name.native})
            </h2>
            {character.media && character.media.nodes.length > 0 && (
              <p>
                <strong>From:</strong> {character.media.nodes[0].title.romaji}
              </p>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: character.description }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterInfo;
