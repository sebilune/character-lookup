import React, { useState, useCallback } from "react";

import SearchInput from "./components/SearchInput";
import SearchIcon from "./components/SearchIcon";
import CharacterResult from "./components/CharacterResult";

import type { Character } from "./types/Character";

import SadAnimeGirl from "./assets/sad-anime-girl.gif";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCharacter = useCallback(async () => {
    if (!searchTerm) {
      setCharacter(null);
      return;
    }

    if (searchTerm === "sebi" || searchTerm === "sebilune") {
      setCharacter({
        name: { full: "Sebi", native: "セビ" },
        description:
          "<p>A cool developer who loves anime and creating awesome projects.<p/><p>\"Preoccupied with a single leaf... you won't see the tree. Preoccupied with a single tree... you'll miss the entire forest. Don't be preoccupied with a single spot. See everything in it's entirety... effortlessly. That is what it means to truly see.\"</p><p>― Takehiko Inoue, Author of Vagabond</p>",
        image: { large: "https://avatars.githubusercontent.com/u/118302324" },
        media: { nodes: [{ title: { romaji: "Cyberspace" } }] },
      });
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
        setCharacter({
          name: { full: "Character not found", native: "404" },
          description:
            "<p>Your character could not be found. Please try again.<p/>",
          image: { large: SadAnimeGirl },
          media: { nodes: [{ title: { romaji: "System" } }] },
        });
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
      <h1 className="title">
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
      <CharacterResult character={character} loading={loading} />
    </>
  );
};

export default App;
