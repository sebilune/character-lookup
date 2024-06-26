import React, { useState, useCallback } from "react";

import SearchInput from "./components/SearchInput";
import SearchIcon from "./components/SearchIcon";
import CharacterResult from "./components/CharacterResult";

import type { Character } from "./types/Character";

import "./App.css";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
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
