import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { getSavedMovies } from '../../utils/MainApi';

function SavedMovies({ savedMovies, setSavedMovies, isLoggedIn, deleteMovie }) {
  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
      })
  }, [setSavedMovies])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm />
        <MoviesCardList movies={savedMovies} deleteMovie={deleteMovie} />
        <div className="saved-movies__divider"></div>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;