import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { updateUserInfo } from '../../utils/MainApi';

function Profile({ isLoggedIn, signOut, setCurrentUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(values.name, values.email)
      .then((data) => {
        setCurrentUser({
          name: data.name,
          email: data.email
        });
      })
      .catch((err) => {

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
            <button type="submit" className="profile__button-edit" disabled={!isValid}>Редактировать</button>
            <Link to="/" className="profile__button-logout" onClick={signOut}>Выйти из аккаунта</Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default Profile;