import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMoreButton from './MoviesMoreButton/MoviesMoreButton';
import Footer from '../Footer/Footer';
import { getAllMovies } from '../../utils/MoviesApi';

function Movies({ isLoggedIn }) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     getAllMovies()
  //       .then((data) => {
  //         setAllMovies(data);
  //         console.log(allMovies);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       })
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    handleSearchMovies();
  }, []);

  const handleSearchMovies = () => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);
    getAllMovies()
      .then((data) => {
        if (data.length === 0) {
          setError('Ничего не найдено');
          setMovies([]);
        } else {
          const filteredMovies = data.filter((movie) =>
            movie.nameEN.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
            movie.nameRU.toLowerCase().includes(searchQuery.trim().toLowerCase())
          );
          setMovies(filteredMovies);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        setMovies([]);
        setIsLoading(false);
      })

  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearchMovies}
          error={error}
        />
        <MoviesCardList movies={movies} isLoading={isLoading} />
        {!error && <MoviesMoreButton />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;