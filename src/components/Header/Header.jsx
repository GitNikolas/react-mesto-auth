import React from "react";
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ loggedIn, currentEmail, signOut }) => {
  let location = useLocation();

  return (
    <header className="header">
    <Link to="/">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
    </Link>

    <nav  className="header__navigation">

    {loggedIn && <p className="header__email">{currentEmail}</p>}

    {location.pathname ==='/' &&
    <Link
    to='/sign-in'
    className="header__nav-button_type_exit"
    onClick={signOut}
    >Выйти</Link>}

    {location.pathname ==='/sign-in' && <Link to='/sign-up' className="header__nav-button">Регистрация</Link>}

    {location.pathname ==='/sign-up' &&
      <Link
      to='/sign-in'
      className="header__nav-button"
      >Войти</Link>}

    </nav>
  </header>
  );
}

export default Header;
