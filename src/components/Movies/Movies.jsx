import React, { useState, useEffect, useCallback } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMoreButton from './MoviesMoreButton/MoviesMoreButton';
import Footer from '../Footer/Footer';
import { getAllMovies } from '../../utils/MoviesApi';
import { filterMoviesByKeyword, filterShortMovies } from '../../utils/moviesFilter';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import useResponsiveVisibleMoviesCount from '../../hooks/useResponsiveVisibleMoviesCount';
import { SCREEN_1140, SCREEN_975, SCREEN_480, ADD_MOVIE_XL, ADD_MOVIE_LG, ADD_MOVIE_MD, ADD_MOVIE_SM } from '../../utils/constants';

function Movies({ isLoggedIn, saveMovie, deleteMovie }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleMoviesCount, setVisibleMoviesCount, windowWidth] = useResponsiveVisibleMoviesCount();

  const loadMoreMovies = useCallback(() => {
    if (windowWidth > SCREEN_1140) {
      setVisibleMoviesCount((prevCount) => prevCount + ADD_MOVIE_XL);
    } else if (windowWidth >= SCREEN_975 && windowWidth <= SCREEN_1140) {
      setVisibleMoviesCount((prevCount) => prevCount + ADD_MOVIE_LG);
    } else if (windowWidth > SCREEN_480 && windowWidth <= SCREEN_975) {
      setVisibleMoviesCount((prevCount) => prevCount + ADD_MOVIE_MD);
    } else if (windowWidth <= SCREEN_480) {
      setVisibleMoviesCount((prevCount) => prevCount + ADD_MOVIE_SM);
    }
  }, [windowWidth, setVisibleMoviesCount]);

  useEffect(() => {
    const storageFilteredSearch = getFromLocalStorage('filtredSearch');

    if (storageFilteredSearch) {
      setFilteredMovies(storageFilteredSearch.filteredResult);
      setSearchQuery(storageFilteredSearch.searchQuery.trim());
      setIsChecked(storageFilteredSearch.isChecked);
    }
  }, []);

  async function handleSearchMovies(searchQuery) {
    try {

      if (!searchQuery.trim()) {
        return;
      }

      const storageSearch = getFromLocalStorage('allМovies');

      if (storageSearch) {
        const filteredByKeyword = await filterMoviesByKeyword(storageSearch, searchQuery.trim());
        const filteredResult = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('filtredSearch', { filteredResult, searchQuery, isChecked });
        setFilteredMovies(filteredResult);
        if (filteredResult.length === 0) {
          setError('Ничего не найдено');
        }  else {
          setError('');
        }
      } else {
        setIsLoading(true);
        const data = await getAllMovies();
        setMovies(data);
        saveToLocalStorage('allМovies', data);
        const filteredByKeyword = await filterMoviesByKeyword(data, searchQuery.trim());
        const filteredResult = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('filtredSearch', { filteredResult, searchQuery, isChecked });
        setFilteredMovies(filteredResult);
        if (filteredResult.length === 0) {
          setError('Ничего не найдено');
        } else {
          setError('');
        }
      }
    } catch (error) {
      setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
      setIsLoading(false);
    }
  }

  function handleCheckbox(isChecked) {
    const storageSearch = getFromLocalStorage('allМovies');
    if (storageSearch) {
      const filteredByKeyword = filterMoviesByKeyword(storageSearch, searchQuery.trim());
      const filteredResult = filterShortMovies(filteredByKeyword, isChecked);
      setFilteredMovies(filteredResult);
      saveToLocalStorage('filtredSearch', { filteredResult, searchQuery, isChecked });
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
        <MoviesCardList movies={filteredMovies.slice(0, visibleMoviesCount)} isLoading={isLoading} error={error} saveMovie={saveMovie} deleteMovie={deleteMovie} />

        {(!error && filteredMovies.length !== 0 && visibleMoviesCount < filteredMovies.length) && <MoviesMoreButton loadMore={loadMoreMovies} />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;