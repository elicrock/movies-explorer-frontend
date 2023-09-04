import React, { useState, useEffect, useCallback } from 'react';
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
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const resizeTimeoutDelay = 300; // Задержка в миллисекундах
    let resizeTimeout;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, resizeTimeoutDelay);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const loadMoreMovies = useCallback(() => {
    if (windowWidth > 1140) {
      // Для ширины 1140px и выше загружаем по 4 карточки
      setVisibleMoviesCount((prevCount) => prevCount + 4);
    } else if (windowWidth >= 975 && windowWidth <= 1140) {
      // Для ширины от 975px до 1140px загружаем по 3 карточки
      setVisibleMoviesCount((prevCount) => prevCount + 3);
    } else if (windowWidth > 480 && windowWidth <= 975) {
      // Для ширины от 480px до 975px загружаем по 2 карточки
      setVisibleMoviesCount((prevCount) => prevCount + 2);
    } else if (windowWidth <= 480) {
      // Для ширины меньше 480px загружаем по 1 карточке
      setVisibleMoviesCount((prevCount) => prevCount + 1);
    }
  }, [windowWidth]);

  // useEffect(() => {
  //   if (filteredMovies.length > visibleMoviesCount) {
  //     // Если есть еще карточки для отображения, показываем кнопку "Ещё"
  //     return;
  //   }
  // }, [filteredMovies, visibleMoviesCount]);

  useEffect(() => {
    const storageFilteredSearch = getFromLocalStorage('filtredSearch');

    if (storageFilteredSearch) {
      setFilteredMovies(storageFilteredSearch.filteredMoviesResult);
      setSearchQuery(storageFilteredSearch.searchQuery.trim());
      setIsChecked(storageFilteredSearch.isChecked);
      setIsSearchSubmit(true);
    }
    let initialVisibleMoviesCount = 16; // Значение по умолчанию

    if (window.innerWidth >= 1141) {
      initialVisibleMoviesCount = 16;
    } else if (window.innerWidth >= 975 && window.innerWidth <= 1140) {
      initialVisibleMoviesCount = 12;
    } else if (window.innerWidth > 480 && window.innerWidth <= 975) {
      initialVisibleMoviesCount = 8;
    } else if (window.innerWidth <= 480) {
      initialVisibleMoviesCount = 5;
    }

    setTimeout(() => {
      setVisibleMoviesCount(initialVisibleMoviesCount);
    }, 0);
  }, []);

  async function handleSearchMovies(isChecked) {
    try {

      if (!searchQuery.trim()) {
        setIsSearchSubmit(true);
        return;
      }

      const storageSearch = getFromLocalStorage('search');

      if (storageSearch) {
        const filteredMoviesResult = await filterMovies(storageSearch, searchQuery.trim(), isChecked);
        // const filteredByShort = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('filtredSearch', { filteredMoviesResult, searchQuery, isChecked });
        setFilteredMovies(filteredMoviesResult);
        setVisibleMoviesCount(16);
        if (filteredMoviesResult.length === 0) {
          setError('Ничего не найдено');
        }  else {
          setError('');
        }
      } else {
        setIsLoading(true);
        const data = await getAllMovies();
        setMovies(data);
        const filteredMoviesResult = await filterMovies(data, searchQuery.trim(), isChecked);
        // const filteredByShort = await filterShortMovies(filteredByKeyword, isChecked);
        saveToLocalStorage('search', data);
        saveToLocalStorage('filtredSearch', { filteredMoviesResult, searchQuery, isChecked });
        setFilteredMovies(filteredMoviesResult);
        setVisibleMoviesCount(16);
        if (filteredMoviesResult.length === 0) {
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
        <MoviesCardList filteredMovies={filteredMovies.slice(0, visibleMoviesCount)} isLoading={isLoading} error={error} />

        {(!error && filteredMovies.length !== 0 && visibleMoviesCount < filteredMovies.length) && <MoviesMoreButton loadMore={loadMoreMovies} />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;