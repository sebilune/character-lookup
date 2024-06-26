export type Character = {
  name: {
    full: string;
    native: string;
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
