import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Header.css';
import Navigation from "../Navigation/Navigation";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const changeHeaderBg = location.pathname !== '/';

  return (
    <header className={`header ${changeHeaderBg ? 'header_dark-bg' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" />
        {
          isLoggedIn ? (
            <ul className="header__list">
              <li><Link to="/signup" className="header__item">Регистрация</Link></li>
              <li><Link to="/signin" className="header__item header__item_btn">Войти</Link></li>
            </ul>
          ) : (
            <>
              <Navigation changeHeaderBg={changeHeaderBg} />
              <BurgerMenu />
            </>
          )
        }
      </div>
    </header>
  );
}

export default Header;