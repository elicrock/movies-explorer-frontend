import React, { useState, useEffect, useCallback } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMoreButton from './MoviesMoreButton/MoviesMoreButton';
import Footer from '../Footer/Footer';
import { getAllMovies, BASE_URL } from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import { filterMoviesByKeyword, filterShortMovies } from '../../utils/moviesFilter';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import useResponsiveVisibleMoviesCount from '../../hooks/useResponsiveVisibleMoviesCount';
import { SCREEN_1140, SCREEN_975, SCREEN_480, ADD_MOVIE_XL, ADD_MOVIE_LG, ADD_MOVIE_MD, ADD_MOVIE_SM } from '../../utils/constants';

function Movies({ isLoggedIn }) {
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

      const storageSearch = getFromLocalStorage('search');

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
        saveToLocalStorage('search', data);
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
    const filteredByKeyword = filterMoviesByKeyword(movies, searchQuery.trim());
    const filteredResult = filterShortMovies(filteredByKeyword, isChecked);
    setFilteredMovies(filteredResult);
    saveToLocalStorage('filtredSearch', { filteredResult, searchQuery, isChecked });
  }

  function handleSaveMovie(movie) {
    mainApi.addSaveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${BASE_URL}/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${BASE_URL}/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
    .then((data) => {
      console.log('save', data);
    })
  }

  function handleDeleteMovie(movie) {
    mainApi.deleteSavedMovie(movie._id)
      .then((data) => {
        console.log('delete', data);
      })
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
        <MoviesCardList movies={filteredMovies.slice(0, visibleMoviesCount)} isLoading={isLoading} error={error} saveMovie={handleSaveMovie} deleteMovie={handleDeleteMovie} />

        {(!error && filteredMovies.length !== 0 && visibleMoviesCount < filteredMovies.length) && <MoviesMoreButton loadMore={loadMoreMovies} />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;