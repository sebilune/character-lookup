import React, { useEffect, useState, useCallback } from 'react';

type Character = {
    name: {
        full: string;
    };
    description: string;
    image: {
        large: string;
    };
};

interface CharacterInfoProps {
    initialSearch?: string;
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

        const query = `
        query {
            Character(search: "${searchTerm}") {
                name {
                    full
                }
                description(asHtml: true)
                image {
                    large
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
            body: JSON.stringify({ query }),
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

    return (
        <div>
            <h1> Anime Character Info</h1>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Miyamoto Musashi..."
                />
            </div>
            <div id="character-info">
                {loading && <div>Loading...</div>}
                {!loading && character && (
                  <>
                    <h2>{character.name.full}</h2>
                    <div dangerouslySetInnerHTML={{ __html: character.description }}></div>
                    <img src={character.image.large} alt={character.name.full} />
                  </>
                )}
            </div>
        </div>
    );
};

export default CharacterInfo;
