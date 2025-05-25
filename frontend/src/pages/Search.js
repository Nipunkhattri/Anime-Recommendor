import React, { useState } from 'react';
import axios from '../api/axios';
import AnimeCard from './AnimeCard.js';

function Search() {
  const [query, setQuery] = useState({ name: '', genre: '' });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get('/anime/search', {
        params: { name: query.name, genre: query.genre }
      });
      setResults(res.data?.data?.Page?.media || []);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Anime</h2>
      <input
        type="text"
        placeholder="Name"
        value={query.name}
        onChange={(e) => setQuery({ ...query, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Genre"
        value={query.genre}
        onChange={(e) => setQuery({ ...query, genre: e.target.value })}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: '2rem' }}>
        {results.map((anime, idx) => (
          <AnimeCard key={idx} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default Search;