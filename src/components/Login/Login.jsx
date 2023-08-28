import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';

function Login() {
  return (
    <section className="login">
      <Link to="/" className="login__logo" />
      <h2 className="login__title">Добро пожаловать!</h2>
      <form className="login__form">
        <label className="login__label">
          E-mail
          <input className="login__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" required />
          <span className="login__input-error email-error">Ошибка</span>
        </label>
        <label className="login__label">
          Пароль
          <input className="login__input" name="password" type="password" placeholder="Пароль" minLength="2" maxLength="30" required />
          <span className="login__input-error password-error">Ошибка</span>
        </label>
        <button type="submit" className="login__button">Войти</button>
      </form>
      <p className="login__signup">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
    </section>
  )
}

export default Login;