import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Header.css';
import Navigation from "../Navigation/Navigation";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
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
              <Navigation />
              <BurgerMenu />
            </>
          )
        }
      </div>
    </header>
  );
}

export default Header;