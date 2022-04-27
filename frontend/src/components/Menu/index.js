import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Menu = () => (
  <nav id="main-menu">
    <ul>
      <li>
        <NavLink activeclassname="active" to="/">Accueil</NavLink>
      </li>
      <li>
        <NavLink activeclassname="active" to="soundboard">Soundboards</NavLink>
      </li>
      <li>
        <NavLink activeclassname="active" to="user">Utilisateurs</NavLink>
      </li>
    </ul>
  </nav>
);

export default Menu;
