import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../App/App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import { getUserInfo, register, authorize } from '../../utils/MainApi';
import { handleError } from '../../utils/handleError';
import * as mainApi from '../../utils/MainApi';
import { BASE_URL } from '../../utils/constants';
import { saveToLocalStorage } from '../../utils/localStorage';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [savedMovies, setSavedMovies] = React.useState([]);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    getUserInfo()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.error('Произошла ошибка выполнения запроса:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function onRegister({name, email, password}) {
    register(name, email, password)
      .then((res) => {
        onLogin({ email, password });
      })
      .catch((err) => {
        handleError(err, setIsSubmitError);
        console.error('При регистрации пользователя произошла ошибка.', err);
      })
  };

  function onLogin({ email, password }) {
    authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        handleError(err, setIsSubmitError, 'loginForm');
      })
  };

  function handleSaveMovie(movie) {
    return mainApi.addSaveMovie({
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
    .then(newMovie => {
      setSavedMovies([newMovie, ...savedMovies]);
      saveToLocalStorage('savedMovies', [newMovie, ...savedMovies]);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function handleDeleteMovie(movie) {
    let movieId = movie._id;

    if (!movieId && savedMovies.length > 0) {
      const foundMovie = savedMovies.find((m) => m.movieId === movie.id);
      if (foundMovie) {
        movieId = foundMovie._id;
      }
    }

    if (movieId) {
      mainApi
        .deleteSavedMovie(movieId)
        .then(() => {
          setSavedMovies((movie) => movie.filter((m) => m._id !== movieId));
          saveToLocalStorage('savedMovies', savedMovies.filter((m) => m._id !== movieId));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="page">
      {isLoading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />}/>
            <Route path="/movies" element={
              <ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} saveMovie={handleSaveMovie} deleteMovie={handleDeleteMovie} />
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} deleteMovie={handleDeleteMovie} />
            }/>
            <Route path="/profile" element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                isSubmitError={isSubmitError}
                setIsSubmitError={setIsSubmitError}
              />
            }/>
            <Route path="/signup" element={<Register onRegister={onRegister} isSubmitError={isSubmitError}/>}/>
            <Route path="/signin" element={<Login onLogin={onLogin} isSubmitError={isSubmitError} />}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
