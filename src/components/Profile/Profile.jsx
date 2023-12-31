import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { updateUserInfo, logout } from '../../utils/MainApi';
import { handleError } from '../../utils/handleError';
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/constants';

function Profile({ isLoggedIn, setIsLoggedIn, setCurrentUser, isSubmitError, setIsSubmitError }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, setErrors, setValues, resetForm } = useFormAndValidation();

  const initialValuesChanged = values.name !== currentUser.name || values.email !== currentUser.email;

  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeEmail = (e) => {
    handleChange(e);
    setIsUpdateSuccess('');
    setIsSubmitError('');
    const { name, value } = e.target;
    if (name === 'email') {
      if (!EMAIL_REGEX.test(value)) {
        setErrors({ ...errors, email: 'Введите корректный email: example@example.ru'});
      }
    }
  }

  const handleChangeName = (e) => {
    handleChange(e);
    setIsUpdateSuccess('');
    setIsSubmitError('');
    const { name, value } = e.target;
    if (name === 'name') {
      if (!NAME_REGEX.test(value)) {
        setErrors({ ...errors, [name]: 'Поле должно содержать только латиницу, кириллицу, пробел или дефис.'});
      }
    } else if (value.length < 2 || value.length < 30) {
      setErrors({ ...errors, [name]: 'Поле должно содержать от 2 до 30 символов.'});
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  }

  function handleSubmitClick() {
    setIsSubmit(!isSubmit);
    setIsUpdateSuccess('');
    setIsSubmitError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);

    try {
      const data = await updateUserInfo(values.name, values.email);
      setCurrentUser(data);
      setIsSubmit(false);
      setIsSubmitting(false);
      setIsFormValid(false);

      if (data) {
        setIsUpdateSuccess('Данные успешно обновлены');
      }
    } catch (err) {
      handleError(err, setIsSubmitError);
      setIsSubmitting(false);
      setIsFormValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errors.email || errors.name) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [errors]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      setValues({
        name: currentUser.name,
        email: currentUser.email
      });
    }
    setIsSubmitError('');
  }, [currentUser, setValues, resetForm, setIsSubmitError]);

  const signOut = () => {
    logout()
      .then((res) => {
        if (res) {
          setIsLoggedIn(false);
          setCurrentUser({});
          localStorage.clear();
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
        <form className="profile__form" name="profileForm" onSubmit={handleSubmit} noValidate>
          <div className="profile__inputs">
            <label className="profile__label">
              Имя
              <input className="profile__input" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" value={values.name || ''} onChange={handleChangeName} disabled={isSubmitting} required />
            </label>
            <span className={`profile__input-error name-error ${errors.name ? 'profile__input-error_active' : ''}`}>{errors.name}</span>
            <label className="profile__label">
              E-mail
              <input className="profile__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" value={values.email || ''} onChange={handleChangeEmail} required disabled={isSubmitting} />
            </label>
            <span className={`profile__input-error email-error ${errors.email ? 'profile__input-error_active' : ''}`}>{errors.email}</span>
          </div>
          <div className="profile__buttons-container">
            <span className={`profile__submit-error ${isUpdateSuccess || isSubmitError ? 'profile__submit-error_active' : ''}`}>{isUpdateSuccess || isSubmitError}</span>
            {isSubmit &&
              <button type="submit" className={`profile__button-save ${!isFormValid || !initialValuesChanged || isSubmitting ? 'profile__button-save_disabled' : ''}`} disabled={!isFormValid || !initialValuesChanged || isSubmitting}>
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