import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({ title, nameForm, btnText, children, textPage, linkPage, textLink, onSubmit, isValid }) {
  return (
    <section className="auth">
      <Link to="/" className="auth__logo" />
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" name={nameForm} onSubmit={onSubmit} noValidate>
        {children &&
          <div className="auth__inputs">
            {children}
          </div>
        }
        <div className="auth__button-container">
          <button type="submit" className={`auth__button ${!isValid ? 'auth__button_disabled' : ''}`} disabled={!isValid}>{btnText}</button>
          <p className="auth__text-page">{textPage} <Link to={linkPage} className="auth__link">{textLink}</Link></p>
        </div>
      </form>
    </section>
  )
}

export default AuthForm;