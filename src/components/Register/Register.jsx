import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css'
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/constants';

function Register({ isLoggedIn, onRegister, isSubmitError, setIsSubmitError }) {
  const { values, handleChange, errors, setErrors, isValid, resetForm } = useFormAndValidation();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  const handleChangeEmail = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    if (name === 'email') {
      if (!EMAIL_REGEX.test(value)) {
        setErrors({ ...errors, email: 'Введите корректный email: example@example.ru'});
      }
    }
  }

  const handleChangeName = (e) => {
    handleChange(e);
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

  useEffect(() => {
    if (errors.email || errors.name) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
    setIsSubmitError('');
  }, [errors, setIsSubmitError]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  if (isLoggedIn) {
    return <Navigate to="/movies" />;
  }

  return (
    <AuthForm
      title="Добро пожаловать!"
      nameForm="registerForm"
      btnText="Зарегистрироваться"
      textPage="Уже зарегистрированы?"
      linkPage="/signin"
      textLink="Войти"
      onSubmit={handleSubmit}
      isValid={isValid}
      isFormValid={isFormValid}
      isSubmitError={isSubmitError}
    >
      <label className="auth__label">
        Имя
        <input className="auth__input" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" value={values.name || ''} onChange={handleChangeName} required />
      </label>
      <span className={`auth__input-error name-error ${errors.name ? 'auth__input-error_active' : ''}`}>{errors.name}</span>
      <label className="auth__label">
        E-mail
        <input className="auth__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" value={values.email || ''} onChange={handleChangeEmail} required />
      </label>
      <span className={`auth__input-error email-error ${errors.email ? 'auth__input-error_active' : ''}`}>{errors.email}</span>
      <label className="auth__label">
        Пароль
        <input className="auth__input" name="password" type="password" placeholder="Пароль" minLength="2" maxLength="30" value={values.password || ''} onChange={handleChange} required />
      </label>
      <span className={`auth__input-error password-error ${errors.password ? 'auth__input-error_active' : ''}`}>{errors.password}</span>
    </AuthForm>
  )
}

export default Register;