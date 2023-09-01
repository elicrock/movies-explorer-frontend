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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSearchMovies = () => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);

    const filteredMovies = allMovies.filter((movie) =>
    movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
  );

    setSearchResults(filteredMovies);

    setIsLoading(false);

    console.log(searchResults);

  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearchMovies}
        />
        {isLoading && <div>Идет загрузка...</div>}
        {error && <div>{error}</div>}
        <MoviesCardList searchResults={searchResults} />
        <MoviesMoreButton />
      </main>
      <Footer />
    </>
  )
}

export default Movies;