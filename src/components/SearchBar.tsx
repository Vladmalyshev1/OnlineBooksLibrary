import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by title, author, category, or access type"
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;