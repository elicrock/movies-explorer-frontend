import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

function Login() {
  return (
    <AuthForm
      title="Рады видеть!"
      nameForm="login"
      btnText="Войти"
      textPage="Ещё не зарегистрированы?"
      linkPage="/signup"
      textLink="Регистрация"
    >
      <label className="auth__label">
        E-mail
        <input className="auth__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" required />
        <span className="auth__input-error email-error">Ошибка</span>
      </label>
      <label className="auth__label">
        Пароль
        <input className="auth__input" name="password" type="password" placeholder="Пароль" minLength="2" maxLength="30" required />
        <span className="auth__input-error password-error">Ошибка</span>
      </label>
    </AuthForm>
  )
}

export default Login;