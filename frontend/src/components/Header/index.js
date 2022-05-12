import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo';
import Login from 'src/containers/Login';
import Menu from 'src/containers/Menu';

import './styles.scss';

const Header = ({ title }) => (
  <header>
    <div className="header-left">
      <NavLink to="/">
        <Logo title={title} />
        <h1>{title}</h1>
      </NavLink>
    </div>
    <div className="header-right">
      <Login />
      <Menu />
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
