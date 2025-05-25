import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

function Preferences() {
  const [genres, setGenres] = useState([]);
  const [inputGenre, setInputGenre] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const res = await axios.get('/user/preferences');
      setGenres(res.data.map(g => g.genre));
    } catch (err) {
      console.error('Error fetching preferences', err);
    }
  };

  const handleAdd = () => {
    if (inputGenre && !genres.includes(inputGenre)) {
      setGenres([...genres, inputGenre]);
      setInputGenre('');
    }
  };

  const handleRemove = (genre) => {
    setGenres(genres.filter(g => g !== genre));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/user/preferences', { genres });
      setMessage('Preferences updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Set Your Anime Preferences (Genres)</h2>
      <input
        type="text"
        value={inputGenre}
        onChange={(e) => setInputGenre(e.target.value)}
        placeholder="e.g. Action"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {genres.map((g, idx) => (
          <li key={idx}>
            {g} <button onClick={() => handleRemove(g)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Save Preferences</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default Preferences;