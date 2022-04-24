import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo';
import Login from '../Login';
import Menu from '../Menu';

import './styles.scss';

const Header = ({ title }) => (
  <header>
    <div className="header-left">
      <Logo title={title} />
      <h1>{title}</h1>
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
