import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({ title, nameForm, btnText, children, textPage, linkPage, textLink, onSubmit, isValid, isFormValid, isSubmitError }) {
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
          <span className={`auth__submit-error ${isSubmitError ? 'auth__submit-error_active' : ''}`}>{isSubmitError}</span>
          <button type="submit" className={`auth__button ${!isFormValid || !isValid ? 'auth__button_disabled' : ''}`} disabled={!isFormValid || !isValid}>{btnText}</button>
          <p className="auth__text-page">{textPage} <Link to={linkPage} className="auth__link">{textLink}</Link></p>
        </div>
      </form>
    </section>
  )
}

export default AuthForm;