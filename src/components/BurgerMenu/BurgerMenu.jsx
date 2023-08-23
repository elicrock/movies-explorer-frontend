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
      {
        !isMenuOpen ?
        <button className="header__burger-btn" onClick={handleMenuClick}></button>
        :
          <>
            <div className="burger-bg"></div>
            <div className="burger-menu">
              <button className="burger-menu__close-btn" onClick={handleMenuClick}></button>
              <nav className="burger-menu__links">
                <Link to="/saved-movies" className="burger-menu__link">Главная</Link>
                <Link to="/saved-movies" className="burger-menu__link">Фильмы</Link>
                <Link to="/saved-movies" className="burger-menu__link">Сохранённые фильмы</Link>
              </nav>
              <Link to="/profile" className="burger-menu__link burger-menu__link-profile">Аккаунт</Link>
            </div>
          </>
      }

    </>
  )
}

export default BurgerMenu;