import React, { useCallback } from 'react';
import './MoviesMoreButton.css';
import { SCREEN_1140, SCREEN_975, SCREEN_480, ADD_MOVIE_XL, ADD_MOVIE_LG, ADD_MOVIE_MD, ADD_MOVIE_SM } from '../../../utils/constants';

function MoviesMoreButton({ windowWidth, setVisibleMoviesCount }) {

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

  return (
    <section className="moives__more">
      <button className="moives__more-btn" type="button" onClick={loadMoreMovies}>Ещё</button>
    </section>
  )
}

export default MoviesMoreButton;