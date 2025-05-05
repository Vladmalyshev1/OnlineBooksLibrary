import React, { useState } from 'react';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [accessFilter, setAccessFilter] = useState<'all' | 'free' | 'paid'>('all');

  return (
    <div className="container">
    <h1 className="main-title">Online Book Library</h1>
    <SearchBar onSearch={setSearchQuery} />
    <div className="filter-container">
      <label className="filter-label">
        Фильтр по доступу:
        <select 
          value={accessFilter} 
          onChange={(e) => setAccessFilter(e.target.value as 'all' | 'free' | 'paid')}
          className="filter-select"
        >
          <option value="all">Все</option>
          <option value="free">Бесплатные</option>
          <option value="paid">Платные</option>
        </select>
      </label>
    </div>
    <BookList searchQuery={searchQuery} accessFilter={accessFilter} />
  </div>
);
};

export default Home;