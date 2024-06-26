interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <div className="search-container">
      <input
        className="text-input"
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a character..."
      />
      <button className="btn-primary" onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchInput;
