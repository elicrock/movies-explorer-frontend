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
import * as mainApi from '../../utils/MainApi';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    mainApi.getUserInfo()
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
    mainApi.register(name, email, password)
      .then((res) => {
        onLogin({ email, password });
      })
      .catch((err) => {
        if (err.status === 409) {
          setIsSubmitError('Пользователь с таким email уже существует!');
        } else if (err.status === 500) {
          setIsSubmitError('На сервере произошла ошибка!');
        } else {
          setIsSubmitError('При регистрации пользователя произошла ошибка!');
        }
        setTimeout(() => {
          setIsSubmitError('');
        }, 2000)
        console.error('При регистрации пользователя произошла ошибка.', err);
      })
  };

  function onLogin({ email, password }) {
    mainApi.authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        if (err.status === 401) {
          setIsSubmitError('Вы ввели неправильный логин или пароль!');
        } else if (err.status === 400) {
          setIsSubmitError('При авторизации произошла ошибка. Токен не передан или передан не в том формате!');
        } else if (err.status === 500) {
          setIsSubmitError('На сервере произошла ошибка!');
        } else {
          setIsSubmitError('При авторизации произошла ошибка. Переданный токен некорректен!');
        }
        setTimeout(() => {
          setIsSubmitError('');
        }, 2000)
      })
  };

  function signOut() {
    mainApi.logout()
      .then((res) => {
        if (res) {
          setIsLoggedIn(false);
          setCurrentUser({});
        }
      })
      .catch((err) => {
        console.error('Произошла ошибка выполнения запроса:', err);
      })
  };

  return (
    <div className="page">
      {isLoading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />}/>
            <Route path="/movies" element={
              <ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} />
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />
            }/>
            <Route path="/profile" element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                signOut={signOut}
                setCurrentUser={setCurrentUser}
                isSubmitError={isSubmitError}
                setIsSubmitError={setIsSubmitError}
              />
            }/>
            <Route path="/signup" element={<Register onRegister={onRegister} isSubmitError={isSubmitError} />}/>
            <Route path="/signin" element={<Login onLogin={onLogin} isSubmitError={isSubmitError} />}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
