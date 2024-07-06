import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactPlayer from "react-player";

import CharacterCard from "./CharacterCard";
import Loading from "./Loading";

import type Character from "../types/Character";
import YouTubeVideo from "../types/YouTubeVideo";

import getVideoData from "../utils/getVideoData";
import formatNumber from "../utils/formatNumber";

interface CharacterResultProps {
  character: Character | null;
  loading: boolean;
}

const CharacterResult: React.FC<CharacterResultProps> = ({
  character,
  loading,
}) => {
  const [topOpening, setTopOpening] = useState<YouTubeVideo | null>(null);
  const [viewVideo, setViewVideo] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchTopOpening = async () => {
      if (character?.video) {
        setTopOpening(character.video);
        return;
      }

      if (character && character.media.nodes.length > 0) {
        const animeName = character.media.nodes[0].title.romaji;
        const openingData = await getVideoData(character.name.full, animeName);
        setTopOpening(openingData);
      } else {
        setTopOpening(null);
      }
    };

    fetchTopOpening();
  }, [character]);

  function handleViewVideo() {
    setViewVideo(!viewVideo);
    if (buttonRef.current) {
      buttonRef.current.focus();
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
                <h2 className="summary-title bottom-border">
                  <p>From:&nbsp;</p>
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
              <div className="top-opening">
                <h2
                  className={
                    viewVideo ? "bottom-border summary-title" : "summary-title"
                  }
                >
                  <p>Trending clip featuring character:&nbsp;</p>
                  {topOpening ? (
                    <>
                      <button onClick={handleViewVideo} className="primary">
                        {formatNumber(topOpening.views)}
                      </button>
                      <button
                        onClick={handleViewVideo}
                        className="btn-eye"
                        ref={buttonRef}
                      >
                        {viewVideo ? (
                          <FaEye className="eye-icon" />
                        ) : (
                          <FaEyeSlash className="eye-icon" />
                        )}
                      </button>
                    </>
                  ) : (
                    <a href="">Fetching...</a>
                  )}
                </h2>
                {topOpening && viewVideo && (
                  <div className="player-wrapper">
                    <ReactPlayer url={topOpening.url} controls width="100%" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterResult;
