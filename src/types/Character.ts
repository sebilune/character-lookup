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
  video?: {
    url: string;
    views: number;
    title: string;
  }
};

export default Character;
