import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMoreButton from './MoviesMoreButton/MoviesMoreButton';
import Footer from '../Footer/Footer';
import { getAllMovies } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/moviesFilter';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

function Movies({ isLoggedIn }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchSubmit, setIsSearchSubmit] = useState(false);

  useEffect(() => {
    const storageFilteredSearch = getFromLocalStorage('filtredSearch');

    if (storageFilteredSearch) {
      setFilteredMovies(storageFilteredSearch.filteredMoviesResult);
      setSearchQuery(storageFilteredSearch.searchQuery);
      setIsChecked(storageFilteredSearch.isChecked);
      setIsSearchSubmit(true);
    }
  }, []);

  async function handleSearchMovies(isChecked) {
    try {
      if (!searchQuery) {
        setIsSearchSubmit(true);
        return;
      }

      const storageSearch = getFromLocalStorage('search');

      if (storageSearch) {
        const filteredMoviesResult = await filterMovies(storageSearch, searchQuery, isChecked);
        // const filteredByShort = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('filtredSearch', { filteredMoviesResult, searchQuery, isChecked });
        setFilteredMovies(filteredMoviesResult);
      } else {
        setIsLoading(true);
        const data = await getAllMovies();
        setMovies(data);
        setError('');

        const filteredMoviesResult = await filterMovies(data, searchQuery, isChecked);
        // const filteredByShort = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('search', data);
        saveToLocalStorage('filtredSearch', { filteredMoviesResult, searchQuery, isChecked });
        setFilteredMovies(filteredMoviesResult);
      }
    } catch (error) {
      setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          onSearch={(isChecked) => handleSearchMovies(isChecked)}
        />
        <MoviesCardList filteredMovies={filteredMovies} isLoading={isLoading} error={error} />

        {!error && <MoviesMoreButton />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;