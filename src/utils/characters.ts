import type Character from "../types/Character";

import sadAnimeGirl from "../assets/sad-anime-girl.gif";

const notFound: Character = {
  name: { full: "Character not found", native: "404" },
  description: "<p>Your character could not be found. Please try again.<p/>",
  image: { large: sadAnimeGirl },
  media: { nodes: [{ title: { romaji: "System" } }] },
  video: false,
};

const sebi: Character = {
  name: { full: "Sebi", native: "セビ" },
  description:
    "<p>A cool developer who loves anime and creating awesome projects.<p/><p>\"Preoccupied with a single leaf... you won't see the tree. Preoccupied with a single tree... you'll miss the entire forest. Don't be preoccupied with a single spot. See everything in it's entirety... effortlessly. That is what it means to truly see.\"</p><p>― Takehiko Inoue, Author of Vagabond</p>",
  image: { large: "https://avatars.githubusercontent.com/u/118302324" },
  media: { nodes: [{ title: { romaji: "Cyberspace" } }] },
  video: false,
};

const characters: { [key: string]: Character } = {
  notFound,
  sebi,
};

export default characters;
