import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMoreButton from './MoviesMoreButton/MoviesMoreButton';
import Footer from '../Footer/Footer';
import { getAllMovies } from '../../utils/MoviesApi';

function Movies({ isLoggedIn }) {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      getAllMovies()
        .then((data) => {
          setAllMovies(data);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }, [isLoggedIn]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm />
        <MoviesCardList allMovies={allMovies} />
        <MoviesMoreButton />
      </main>
      <Footer />
    </>
  )
}

export default Movies;