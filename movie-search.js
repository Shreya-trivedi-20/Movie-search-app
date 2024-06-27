import React, { useState } from 'react';
import './MovieSearch.css';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    if (query.trim()) {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError('');
        } else {
          setError(data.Error);
          setMovies([]);
        }
      } catch (err) {
        setError('Failed to fetch movies.');
        setMovies([]);
      }
    }
  };

  return (
    <div className="movie-search-container">
      <h1>Movie Search App</h1>
      <div className="input-container">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie name"
          onKeyPress={e => { if (e.key === 'Enter') fetchMovies(); }}
        />
        <button onClick={fetchMovies}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie.imdbID} className="movie-item">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
