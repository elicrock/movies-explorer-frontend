import React from 'react';
import { Link } from "react-router-dom";
import './AuthForm.css';

function AuthForm({ title, nameForm, btnText, children, textPage, linkPage, textLink }) {
  return (
    <section className="auth">
      <Link to="/" className="auth__logo" />
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" name={nameForm}>
        {children &&
          <div className="auth__inputs">
            {children}
          </div>
        }
        <div className="auth__button-container">
          <button type="submit" className="auth__button">{btnText}</button>
          <p className="auth__text-page">{textPage} <Link to={linkPage} className="auth__link">{textLink}</Link></p>
        </div>
      </form>
    </section>
  )
}

export default AuthForm;