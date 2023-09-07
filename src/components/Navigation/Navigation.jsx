import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ changeHeaderBg }) {

  const location = useLocation();

  function addActiveClass(path) {
    return location.pathname === path ? 'header__link_active' : '';
}

  return (
    <>
      <nav className="header__links">
        <Link to="/movies" className={`header__link ${addActiveClass('/movies')}`}>Фильмы</Link>
        <Link to="/saved-movies" className={`header__link ${addActiveClass('/saved-movies')}`}>Сохранённые фильмы</Link>
      </nav>
      <Link to="/profile" className={`header__link ${changeHeaderBg ? 'header__link_dark' : 'header__link_blue'}`}>Аккаунт</Link>
    </>
  );
}

export default Navigation;