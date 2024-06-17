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
        Anime Character Lookup
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
        <form action="https://github.com/sebilune/character-lookup">
          <button type="submit">
            <svg
              viewBox="0 -0.5 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g stroke-width="0"></g>
              <g stroke-linecap="round" stroke-linejoin="round"></g>
              <g>
                {" "}
                <defs> </defs>{" "}
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    transform="translate(-700.000000, -560.000000)"
                    fill="#ffffff"
                  >
                    {" "}
                    <path d="M723.9985,560 C710.746,560 700,570.787092 700,584.096644 C700,594.740671 706.876,603.77183 716.4145,606.958412 C717.6145,607.179786 718.0525,606.435849 718.0525,605.797328 C718.0525,605.225068 718.0315,603.710086 718.0195,601.699648 C711.343,603.155898 709.9345,598.469394 709.9345,598.469394 C708.844,595.686405 707.2705,594.94548 707.2705,594.94548 C705.091,593.450075 707.4355,593.480194 707.4355,593.480194 C709.843,593.650366 711.1105,595.963499 711.1105,595.963499 C713.2525,599.645538 716.728,598.58234 718.096,597.964902 C718.3135,596.407754 718.9345,595.346062 719.62,594.743683 C714.2905,594.135281 708.688,592.069123 708.688,582.836167 C708.688,580.205279 709.6225,578.054788 711.1585,576.369634 C710.911,575.759726 710.0875,573.311058 711.3925,569.993458 C711.3925,569.993458 713.4085,569.345902 717.9925,572.46321 C719.908,571.928599 721.96,571.662047 724.0015,571.651505 C726.04,571.662047 728.0935,571.928599 730.0105,572.46321 C734.5915,569.345902 736.603,569.993458 736.603,569.993458 C737.9125,573.311058 737.089,575.759726 736.8415,576.369634 C738.3805,578.054788 739.309,580.205279 739.309,582.836167 C739.309,592.091712 733.6975,594.129257 728.3515,594.725612 C729.2125,595.469549 729.9805,596.939353 729.9805,599.18773 C729.9805,602.408949 729.9505,605.006706 729.9505,605.797328 C729.9505,606.441873 730.3825,607.191834 731.6005,606.9554 C741.13,603.762794 748,594.737659 748,584.096644 C748,570.787092 737.254,560 723.9985,560">
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
        </form>
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
