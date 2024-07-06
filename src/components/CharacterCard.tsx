/* Components */
import CharacterName from "./CharacterName";

/* Types */
import Character from "../types/Character";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  if (character.name.native === null) character.name.native = "";

  return (
    <div className="card">
      <div className="img-placeholder">
        <img src={character.image.large} alt={character.name.full} />
      </div>
      <h2>
        <CharacterName
          characterName={character.name.full.trim()}
          characterNativeName={character.name.native.trim()}
        />
      </h2>
    </div>
  );
};

export default CharacterCard;
