import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import AnimeCard from './AnimeCard.js';

function Recommendations() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get('/anime/recommendations');
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setResults(res.data?.data?.Page?.media || []);
      }
    } catch (err) {
      setError('Failed to fetch recommendations.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Anime Recommendations</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.map((anime, idx) => (
        <AnimeCard key={idx} anime={anime} />
      ))}
    </div>
  );
}

export default Recommendations;
