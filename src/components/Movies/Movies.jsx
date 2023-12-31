import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMoreButton from './MoviesMoreButton/MoviesMoreButton';
import Footer from '../Footer/Footer';
import { getAllMovies } from '../../utils/MoviesApi';
import { getSavedMovies } from '../../utils/MainApi';
import { filterMoviesByKeyword, filterShortMovies } from '../../utils/moviesFilter';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import useResponsiveVisibleMoviesCount from '../../hooks/useResponsiveVisibleMoviesCount';
import { SCREEN_1140, SCREEN_975, SCREEN_480, INIT_MOVIE_XL, INIT_MOVIE_LG, INIT_MOVIE_MD, INIT_MOVIE_SM } from '../../utils/constants';

function Movies({ isLoggedIn, saveMovie, deleteMovie }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [error, setError] = useState('');
  const [windowWidth] = useResponsiveVisibleMoviesCount();
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(INIT_MOVIE_XL);

  useEffect(() => {
    const storageFilteredSearch = getFromLocalStorage('filteredSearch');

    const savedMoviesFromLocalStorage = getFromLocalStorage('savedMovies');
    setSavedMovies(savedMoviesFromLocalStorage);

    if (storageFilteredSearch) {
      setFilteredMovies(storageFilteredSearch.filteredResult);
      setSearchQuery(storageFilteredSearch.searchQuery.trim());
      setIsChecked(storageFilteredSearch.isChecked);
    } else {
      setFilteredMovies([]);
    }
  }, [setSavedMovies, isChecked]);

  useEffect(() => {
    let initialVisibleMoviesCount = INIT_MOVIE_XL;

    if (windowWidth > SCREEN_1140) {
      initialVisibleMoviesCount = INIT_MOVIE_XL;
    } else if (windowWidth >= SCREEN_975 && windowWidth <= SCREEN_1140) {
      initialVisibleMoviesCount = INIT_MOVIE_LG;
    } else if (windowWidth > SCREEN_480 && windowWidth <= SCREEN_975) {
      initialVisibleMoviesCount = INIT_MOVIE_MD;
    } else if (windowWidth <= SCREEN_480) {
      initialVisibleMoviesCount = INIT_MOVIE_SM;
    }

    setTimeout(() => {
      setVisibleMoviesCount(initialVisibleMoviesCount);
    }, 0);
  }, [windowWidth, searchQuery]);

  const isMovieSaved = (movie, savedMovies) => {
    return savedMovies.find(savedMovie => savedMovie.movieId === movie.id);
  }

  const moviesWithSavedFlag = filteredMovies.map(movie => ({
    ...movie,
    isSaved: isMovieSaved(movie, savedMovies),
  }));

  async function handleSearchMovies(searchQuery) {
    try {

      if (!searchQuery.trim()) {
        return;
      }

      const storageSearch = getFromLocalStorage('allМovies');

      if (storageSearch) {
        const filteredByKeyword = await filterMoviesByKeyword(storageSearch, searchQuery.trim());
        const filteredResult = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('filteredSearch', { filteredResult, searchQuery, isChecked });
        setFilteredMovies(filteredResult);
        if (filteredResult.length === 0) {
          setError('Ничего не найдено');
        }  else {
          setError('');
        }
      } else {
        setIsLoading(true);
        const data = await getAllMovies();
        const saved = await getSavedMovies();
        setSavedMovies(saved);
        setMovies(data);
        saveToLocalStorage('savedMovies', saved);
        saveToLocalStorage('allМovies', data);
        const filteredByKeyword = await filterMoviesByKeyword(data, searchQuery.trim());
        const filteredResult = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('filteredSearch', { filteredResult, searchQuery, isChecked });
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
      saveToLocalStorage('filteredSearch', { filteredResult, searchQuery, isChecked });
      if (filteredResult.length === 0) {
        setError('Ничего не найдено');
      } else {
        setError('');
      }
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
        <MoviesCardList movies={moviesWithSavedFlag.slice(0, visibleMoviesCount)} isLoading={isLoading} error={error} saveMovie={saveMovie} deleteMovie={deleteMovie} />

        {(!error && filteredMovies.length !== 0 && visibleMoviesCount < filteredMovies.length) && <MoviesMoreButton windowWidth={windowWidth} setVisibleMoviesCount={setVisibleMoviesCount} />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;