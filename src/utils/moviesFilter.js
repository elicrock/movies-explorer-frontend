export const filterMoviesByKeyword = (movies, keyword) => {
  const lowercaseKeyword = keyword.toLowerCase();
  return movies.filter((movie) => {
    const nameRU = movie.nameRU.toLowerCase();
    const nameEN = movie.nameEN.toLowerCase();
    return nameRU.includes(lowercaseKeyword) || nameEN.includes(lowercaseKeyword);
  });
};

export const filterShortMovies = (movies, isChecked) => {
  if (isChecked) {
    return movies.filter((movie) => movie.duration <= 40);
  }
  return movies;
};