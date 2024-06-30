import { useEffect, useState } from "react";

import CharacterCard from "./CharacterCard";
import Loading from "./Loading";

import type Character from "../types/Character";
import YouTubeVideo from "../types/YouTubeVideo";

import getTopOpening from "../utils/getTopOpening";
import ReactPlayer from "react-player";

interface CharacterResultProps {
  character: Character | null;
  loading: boolean;
}

const CharacterResult: React.FC<CharacterResultProps> = ({
  character,
  loading,
}) => {
  const [topOpening, setTopOpening] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    const fetchTopOpening = async () => {
      if (character && character.media.nodes.length > 0) {
        const animeName = character.media.nodes[0].title.romaji;
        const openingData = await getTopOpening(animeName);
        setTopOpening(openingData);
      } else {
        setTopOpening(null);
      }
    };

    fetchTopOpening();
  }, [character]);

  if (character?.video !== undefined) {
    setTopOpening(character.video);
  }

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
              <div className="anime-opening">
                <ReactPlayer url={topOpening?.url} controls width="100%" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterResult;
