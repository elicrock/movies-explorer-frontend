import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList({ filteredMovies, isLoading, error }) {
  return (
    <section className="movies">
    <span className={`movies__error ${error ? 'movies__error_active' : ''}`}>{error}</span>
    {/* {error ?
      <span className={`movies__error ${error ? 'movies__error_active' : ''}`}>{error}</span>
      : ''
    } */}
    {
      isLoading ?
        <Preloader />
      :
      <ul className="movies__list">
        {
          filteredMovies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          ))
        }
      </ul>
    }
    </section>
  )
}

export default MoviesCardList;