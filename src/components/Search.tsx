/* Dependencies */
import { useCallback, useState } from "react";

/* Components */
import CharacterResult from "./CharacterResult";

/* Types */
import Character from "../types/Character";

/* Utils */
import characters from "../utils/characters";
import getCharacterData from "../utils/getCharacterData";

const SearchInput: React.FC = () => {
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

    const characterData = await getCharacterData(searchTerm);

    if (characterData) {
      setCharacter(characterData);
    } else {
      setCharacter(characters.notFound);
    }

    setLoading(false);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCharacter();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a character..."
        />
        <button className="btn-primary" type="submit">
          Search
        </button>
      </form>
      <CharacterResult character={character} loading={loading} />
    </>
  );
};

export default SearchInput;
