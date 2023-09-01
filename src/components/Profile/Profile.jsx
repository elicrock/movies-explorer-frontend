import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { updateUserInfo, logout } from '../../utils/MainApi';
import { handleError } from '../../utils/handleError';

function Profile({ isLoggedIn, setIsLoggedIn, setCurrentUser, isSubmitError, setIsSubmitError }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm, isButtonDisable } = useFormAndValidation();

  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmitClick() {
    setIsSubmit(!isSubmit);
  }

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    updateUserInfo(values.name, values.email)
      .then((data) => {
        setCurrentUser(data);
        setIsSubmit(false);
      })
      .catch((err) => {
        if (err.status === 409) {
          setIsSubmitError('Пользователь с таким email уже существует!');
        } else if (err.status === 500) {
          setIsSubmitError('На сервере произошла ошибка!');
        } else {
          setIsSubmitError('При обновлении профиля произошла ошибка!');
        }
        setTimeout(() => {
          setIsSubmitError('');
        }, 2000)
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    if (currentUser) {
      resetForm();
      setValues({
        name: currentUser.name,
        email: currentUser.email
      });
    }
  }, [currentUser, setValues, resetForm]);

  const signOut = () => {
    logout()
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
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
          <div className="profile__inputs">
            <label className="profile__label">
              Имя
              <input className="profile__input" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" value={values.name || ''} onChange={handleChange} required />
            </label>
            <span className={`profile__input-error name-error ${errors.name ? 'profile__input-error_active' : ''}`}>{errors.name}</span>
            <label className="profile__label">
              E-mail
              <input className="profile__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" value={values.email || ''} onChange={handleChange} required />
            </label>
            <span className={`profile__input-error email-error ${errors.email ? 'profile__input-error_active' : ''}`}>{errors.email}</span>
          </div>
          <div className="profile__buttons-container">
            <span className={`profile__submit-error ${isSubmitError ? 'profile__submit-error_active' : ''}`}>{isSubmitError}</span>
            {isSubmit &&
              <button type="submit" className={`profile__button-save ${!isValid || isButtonDisable ? 'profile__button-save_disabled' : ''}`} disabled={!isValid || isButtonDisable}>
                {isLoading ? 'Сохранение' : 'Сохранить'}
              </button>
            }
            {!isSubmit &&
              <>
                <button type="submit" className="profile__button-edit" onClick={handleSubmitClick}>Редактировать</button>
                <Link to="/" className="profile__button-logout" onClick={signOut}>Выйти из аккаунта</Link>
              </>
            }
          </div>
        </form>
      </section>
    </>
  )
}

export default Profile;