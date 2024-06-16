// src/CharacterInfo.tsx
import React, { useEffect, useState, useCallback } from 'react';

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

const CharacterInfo: React.FC<CharacterInfoProps> = ({ initialSearch = '' }) => {
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

        const url = 'https://graphql.anilist.co';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
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
            console.error('Error fetching character data:', error);
            setCharacter(null);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                fetchCharacter();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [fetchCharacter]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        fetchCharacter();
    };

    return (
        <div>
            <h1>Anime Character Lookup</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search for a character..."
                />
                <button onClick={handleSearchClick}>
                    Search
                </button>
            </div>
            <div id="character-info">
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
                            <p><strong>From:</strong> {character.media.nodes[0].title.romaji}</p>
                        )}
                        <div dangerouslySetInnerHTML={{ __html: character.description }}></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CharacterInfo;
