import React from "react";
import logo from '../../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

const Header = ({ loggedIn, currentEmail, signOut }) => {
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
    <Routes>
      <Route path='sign-in' element={<Link to='/sign-up' className="header__nav-button">Регистрация</Link>} />
      <Route path='sign-up' element={<Link to='/' className="header__nav-button">Войти</Link>} />
      <Route
      path='/'
      element={
      <Link
      to='/sign-in'
      className="header__nav-button_type_exit"
      onClick={signOut}
      >Выйти</Link>}
      />
    </Routes>
    </nav>
  </header>
  );
}

export default Header;
