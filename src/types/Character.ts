type Character = {
  name: {
    full: string;
    native: string | null;
  };
  description: string;
  image: {
    large: string;
  };
  media: {
    nodes: {
      title: {
        romaji: string;
      };
    }[];
  };
  video?: false;
};

export default Character;
