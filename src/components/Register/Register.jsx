import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css'
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register({ onRegister, isSubmitError }) {
  const { values, handleChange, errors, isValid, resetForm, isButtonDisable } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <AuthForm
      title="Добро пожаловать!"
      nameForm="register"
      btnText="Зарегистрироваться"
      textPage="Уже зарегистрированы?"
      linkPage="/signin"
      textLink="Войти"
      onSubmit={handleSubmit}
      isValid={isValid}
      isSubmitError={isSubmitError}
      isButtonDisable={isButtonDisable}
    >
      <label className="auth__label">
        Имя
        <input className="auth__input" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" value={values.name || ''} onChange={handleChange} required />
      </label>
      <span className={`auth__input-error name-error ${errors.name ? 'auth__input-error_active' : ''}`}>{errors.name}</span>
      <label className="auth__label">
        E-mail
        <input className="auth__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" value={values.email || ''} onChange={handleChange} required />
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