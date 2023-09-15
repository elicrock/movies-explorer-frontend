import { useState, useEffect, useCallback } from 'react';
// import { SCREEN_1140, SCREEN_975, SCREEN_480, INIT_MOVIE_XL, INIT_MOVIE_LG, INIT_MOVIE_MD, INIT_MOVIE_SM } from '../utils/constants';

function useResponsiveVisibleMoviesCount() {
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



  return [windowWidth];
}

export default useResponsiveVisibleMoviesCount;
