import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { getSavedMovies } from '../../utils/MainApi';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import { filterMoviesByKeyword, filterShortMovies } from '../../utils/moviesFilter';

function SavedMovies({ isLoggedIn, savedMovies, setSavedMovies, deleteMovie }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSavedMovies()
      .then((data) => {
        setSavedMovies(data.reverse());
        saveToLocalStorage('savedMovies', data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setSavedMovies])

  const savedMoviesFromLocalStorage = getFromLocalStorage('savedMovies') || [];

  async function handleSearchMovies(searchQuery) {
    const filteredByKeyword = await filterMoviesByKeyword(savedMoviesFromLocalStorage, searchQuery.trim());
    const filteredResult = await filterShortMovies(filteredByKeyword, isChecked);
    setSavedMovies(filteredResult);
    if (filteredResult.length === 0) {
      setError('Ничего не найдено');
    }  else {
      setError('');
    }
  }

  function handleCheckbox(isChecked) {
    const filteredByKeyword = filterMoviesByKeyword(savedMoviesFromLocalStorage, searchQuery.trim());
    const filteredResult = filterShortMovies(filteredByKeyword, isChecked);
    setSavedMovies(filteredResult);
    if (filteredResult.length === 0) {
      setError('Ничего не найдено');
    }  else {
      setError('');
    }
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearchMovies}
          onCheckbox={handleCheckbox}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        <MoviesCardList movies={savedMovies} isLoading={isLoading} error={error} deleteMovie={deleteMovie} />
        <div className="saved-movies__divider"></div>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;