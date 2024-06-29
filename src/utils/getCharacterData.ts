import axios from "axios";

import type Character from "../types/Character";

const getCharacterData = async (
  searchTerm: string
): Promise<Character | null> => {
  if (!searchTerm) {
    return null;
  }

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
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  try {
    const response = await axios.post(url, { query: characterQuery }, options);
    const data = response.data;

    if (data.data && data.data.Character) {
      const characterData: Character = data.data.Character;
      return characterData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching character data:", error);
    return null;
  }
};

export default getCharacterData;
