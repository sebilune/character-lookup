# Anime Character Lookup

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
5. [API Integration](#api-integration)
7. [Installation](#installation)
9. [License](#license)

## Introduction

This project is a React app designed to provide information about anime characters. Users can search for their favorite anime characters and get detailed information, including their names (both in English and native Japanese), descriptions, images, and the anime they are featured in.

## Features

- Search for anime characters by name
- Display character's full name and native name
- Show character description
- Display character image
- Show the anime from which the character comes
- Responsive and user-friendly interface

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **GraphQL**: A query language for your API, used here to fetch data from the AniList API.
- **AniList API**: A GraphQL-based API to retrieve anime and manga information.

## API Integration

### Querying the API

The project queries the AniList API to fetch data about anime characters. Here is the GraphQL query used:

```graphql
query {
    Character(search: "characterName") {
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
}
```

### What the Query Returns

The query returns the following data about the character:

- **name**: An object containing:
  - `full`: The full name of the character.
  - `native`: The native (Japanese) name of the character.
- **description**: A description of the character in HTML format.
- **image**: An object containing:
  - `large`: A URL to the large-sized image of the character.
- **media**: An object containing:
  - `nodes`: An array of media (anime/manga) objects, each containing:
    - `title`: An object containing:
      - `romaji`: The romaji (Latin alphabet) title of the media.

## Dependencies

This project utilizes the following dependencies:

- **[Vite](https://vitejs.dev/)**: A fast build tool for React projects that provides a rich development experience with instant server startup, fast hot module replacement (HMR), and optimized builds.
- **[Wanakana](https://wanakana.com/)**: A JavaScript library to help with Japanese kana and romaji input.
- **[rc-tooltip](https://github.com/react-component/tooltip)**: A React component for creating customizable tooltips.
- **[lottie-react](https://github.com/Gamote/lottie-react)**: A library to render Lottie animations natively on React components, used for processing Lottie JSON animations throughout the project.

## Installation

To run this project locally, follow these steps:

```sh
  git clone https://github.com/sebilune/character-lookup.git
  cd character-lookup
  npm i
  npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
