import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './BurgerMenu.css';

function BurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function addActiveClass(path) {
      return location.pathname === path ? 'burger-menu__link_active' : '';
  }

  return (
    <>
      <button className={`header__burger-btn ${isMenuOpen ? 'header__burger-btn_hide' : ''}`} onClick={(handleMenuClick)}></button>
      <div className={`burger-menu__overlay ${isMenuOpen ? 'burger-menu__overlay_active' : ''}`} onClick={handleMenuClick}>
        <button className="burger-menu__close-btn" onClick={handleMenuClick} />
        <div className="burger-menu__content" onClick={(e) => e.stopPropagation()}>
          <nav className="burger-menu__links">
            <Link to="/" className={`burger-menu__link ${addActiveClass('/')}`}>Главная</Link>
            <Link to="/movies" className={`burger-menu__link ${addActiveClass('/movies')}`}>Фильмы</Link>
            <Link to="/saved-movies" className={`burger-menu__link ${addActiveClass('/saved-movies')}`}>Сохранённые фильмы</Link>
          </nav>
          <Link to="/profile" className="burger-menu__profile">Аккаунт</Link>
        </div>
      </div>
    </>
  )
}

export default BurgerMenu;