import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList({ movies, isLoading, error, saveMovie, deleteMovie }) {
  return (
    <section className="movies">
    <span className={`movies__error ${error ? 'movies__error_active' : ''}`}>{error}</span>

    {
      isLoading ?
        <Preloader />
      :
      <ul className="movies__list">
        {
          movies.map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          ))
        }
      </ul>
    }
    </section>
  )
}

export default MoviesCardList;