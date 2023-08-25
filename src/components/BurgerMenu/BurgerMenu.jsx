import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './BurgerMenu.css';

function BurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {!isMenuOpen &&
        <button className="header__burger-btn" onClick={(handleMenuClick)}></button>
      }

      {isMenuOpen && (
        <div className={`burger-menu__overlay ${isMenuOpen ? 'burger-menu__overlay_active' : ''}`} onClick={handleMenuClick}>
        <button className="burger-menu__close-btn" onClick={handleMenuClick} />
          <div className="burger-menu__content" onClick={(e) => e.stopPropagation()}>
            <nav className="burger-menu__links">
              <Link to="/" className="burger-menu__link">Главная</Link>
              <Link to="/movies" className="burger-menu__link">Фильмы</Link>
              <Link to="/saved-movies" className="burger-menu__link">Сохранённые фильмы</Link>
            </nav>
            <Link to="/profile" className="burger-menu__profile">Аккаунт</Link>
          </div>
        </div>
      )}
    </>
  )
}

export default BurgerMenu;