import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation() {
  return (
    <>
      <nav className="header__links">
        <Link to="/movies" className="header__link">Фильмы</Link>
        <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
      </nav>
      <Link to="/profile" className="header__link header__link-profile">Аккаунт</Link>
    </>
  );
}

export default Navigation;