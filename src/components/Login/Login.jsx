import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import './Login.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { EMAIL_REGEX } from '../../utils/constants';

function Login({ isLoggedIn, onLogin, isSubmitError, setIsSubmitError }) {
  const { values, handleChange, errors, setErrors, isValid, resetForm } = useFormAndValidation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onLogin(values);
      setIsSubmitting(false);
      setIsFormValid(false);
    } catch (error) {
      setIsSubmitting(false);
      setIsFormValid(false);
    }
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

  useEffect(() => {
    if (errors.email) {
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
      title="Рады видеть!"
      nameForm="loginForm"
      btnText="Войти"
      textPage="Ещё не зарегистрированы?"
      linkPage="/signup"
      textLink="Регистрация"
      onSubmit={handleSubmit}
      isValid={isValid}
      isFormValid={isFormValid}
      isSubmitError={isSubmitError}
      isSubmitting={isSubmitting}
    >
      <label className="auth__label">
        E-mail
        <input className="auth__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" value={values.email || ''} onChange={handleChangeEmail} required disabled={isSubmitting} />
        <span className={`auth__input-error email-error ${errors.email ? 'auth__input-error_active' : ''}`}>{errors.email}</span>
      </label>
      <label className="auth__label">
        Пароль
        <input className="auth__input" name="password" type="password" placeholder="Пароль" minLength="2" maxLength="30" value={values.password || ''} onChange={handleChange} required disabled={isSubmitting} />
        <span className={`auth__input-error password-error ${errors.password ? 'auth__input-error_active' : ''}`}>{errors.password}</span>
      </label>
    </AuthForm>
  )
}

export default Login;