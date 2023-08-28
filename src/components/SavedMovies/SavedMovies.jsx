import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <Header />
      <main className="content">
        <SearchForm />
        <MoviesCardList>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
        </MoviesCardList>
        <div className="saved-movies__divider"></div>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;