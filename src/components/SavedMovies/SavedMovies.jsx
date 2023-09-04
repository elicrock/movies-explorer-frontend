import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { getSavedMovies } from '../../utils/MainApi';

function SavedMovies({ isLoggedIn }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getSavedMovies()
      .then((data) => {
        setMovies(data);
      })
  }, [])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm />
        <MoviesCardList movies={movies} />
        <div className="saved-movies__divider"></div>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;