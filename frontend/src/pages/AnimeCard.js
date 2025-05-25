import React from 'react';

function AnimeCard({ anime }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{anime.title.romaji}</h3>
      <p><strong>Genres:</strong> {anime.genres.join(', ')}</p>
      <p dangerouslySetInnerHTML={{ __html: anime.description }}></p>
    </div>
  );
}

export default AnimeCard;