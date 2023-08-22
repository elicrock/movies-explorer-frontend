import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" />
        {
          isLoggedIn ? (
            <nav className="header__links">
              <Link to="/signup" className="header__link">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_btn">Войти</Link>
            </nav>
          ) : (
            <>
              <nav className="header__links header__links-films">
                <Link to="/movies" className="header__link">Фильмы</Link>
                <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
              </nav>
              <Link to="/profile" className="header__link header__link-profile">Аккаунт</Link>
            </>
          )
        }
      </div>
    </header>
  );
}

export default Header;