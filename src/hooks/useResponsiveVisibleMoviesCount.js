import { useState, useEffect, useCallback } from 'react';
import { SCREEN_1140, SCREEN_975, SCREEN_480, INIT_MOVIE_XL, INIT_MOVIE_LG, INIT_MOVIE_MD, INIT_MOVIE_SM } from '../utils/constants';

function useResponsiveVisibleMoviesCount() {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(INIT_MOVIE_XL);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handlePageLoad = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const resizeTimeoutDelay = 300;
    let resizeTimeout;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, resizeTimeoutDelay);
    });

    window.addEventListener('load', handlePageLoad);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handlePageLoad);
      clearTimeout(resizeTimeout);
    };
  }, [handleResize, handlePageLoad]);

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
  }, [windowWidth]);

  return [visibleMoviesCount, setVisibleMoviesCount, windowWidth];
}

export default useResponsiveVisibleMoviesCount;
