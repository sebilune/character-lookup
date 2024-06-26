import CharacterCard from "./CharacterCard";
import Loading from "./Loading";
import type { Character } from "../types/Character";

interface CharacterResultProps {
  character: Character | null;
  loading: boolean;
}

const CharacterResult: React.FC<CharacterResultProps> = ({
  character,
  loading,
}) => {
  return (
    <div className="character">
      {loading && <Loading />}
      {!loading && character && (
        <>
          <div className="left-panel">
            <CharacterCard character={character} />
          </div>
          <div className="right-panel">
            <div className="character-summary">
              {character.media && character.media.nodes.length > 0 && (
                <h2 className="anime-name">
                  From:{" "}
                  <a
                    href={`https://anilist.co/search/anime?search=${character.media.nodes[0].title.romaji}`}
                  >
                    {character.media.nodes[0].title.romaji}
                  </a>
                </h2>
              )}
              <div
                className="character-description"
                dangerouslySetInnerHTML={{ __html: character.description }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterResult;
