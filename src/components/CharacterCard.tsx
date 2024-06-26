import CharacterName from "./CharacterName";

interface CharacterCardProps {
  character: {
    name: {
      full: string;
      native: string;
    };
    image: {
      large: string;
    };
  };
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
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
  );
};

export default CharacterCard;
