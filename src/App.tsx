import { useState, useCallback } from "react";

import SearchInput from "./components/SearchInput";
import CharacterResult from "./components/CharacterResult";
import Title from "./components/Title";
import GitHubIcon from "./components/GithubIcon";

import type Character from "./types/Character";

import characters from "./utils/characters";
import getCharacterData from "./utils/getCharacterData";

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
      setCharacter(characters.sebi);
      return;
    }

    setLoading(true);

    try {
      const characterData = await getCharacterData(searchTerm);

      if (characterData) {
        setCharacter(characterData);
      } else {
        setCharacter(characters.notFound);
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
      <GitHubIcon />
      <Title />
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
