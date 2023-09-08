import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import './Login.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Login({ isLoggedIn, onLogin, isSubmitError }) {
  const { values, handleChange, errors, isValid, resetForm, isButtonDisable } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

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
      isSubmitError={isSubmitError}
      isButtonDisable={isButtonDisable}
    >
      <label className="auth__label">
        E-mail
        <input className="auth__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" value={values.email || ''} onChange={handleChange} required />
        <span className={`auth__input-error email-error ${errors.email ? 'auth__input-error_active' : ''}`}>{errors.email}</span>
      </label>
      <label className="auth__label">
        Пароль
        <input className="auth__input" name="password" type="password" placeholder="Пароль" minLength="2" maxLength="30" value={values.password || ''} onChange={handleChange} required />
        <span className={`auth__input-error password-error ${errors.password ? 'auth__input-error_active' : ''}`}>{errors.password}</span>
      </label>
    </AuthForm>
  )
}

export default Login;