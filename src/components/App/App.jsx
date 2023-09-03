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
                setIsLoggedIn={setIsLoggedIn}
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
