import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css'

function Register() {
  return (
    <AuthForm
      title="Добро пожаловать!"
      nameForm="register"
      btnText="Зарегистрироваться"
      textPage="Уже зарегистрированы?"
      linkPage="/signin"
      textLink="Войти"
    >
      <label className="auth__label">
        Имя
        <input className="auth__input" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" required />
      </label>
      <span className="auth__input-error name-error">Ошибка</span>
      <label className="auth__label">
        E-mail
        <input className="auth__input" name="email" type="email" placeholder="E-mail" minLength="2" maxLength="30" required />
      </label>
      <span className="auth__input-error email-error">Ошибка</span>
      <label className="auth__label">
        Пароль
        <input className="auth__input" name="password" type="password" placeholder="Пароль" minLength="2" maxLength="30" required />
      </label>
      <span className="auth__input-error password-error">Ошибка</span>
    </AuthForm>
  )
}

export default Register;