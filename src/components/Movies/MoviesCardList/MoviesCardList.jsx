import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ searchResults }) {
  return (
    <section className="movies">
      <ul className="movies__list">
        {
          searchResults.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          ))
        }
      </ul>
    </section>
  )
}

export default MoviesCardList;