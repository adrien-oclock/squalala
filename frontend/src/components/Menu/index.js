import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Menu = (props) => (
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
      {props.isLogged &&
      <li>
        <NavLink activeclassname="active" to="soundboard/1">Profil</NavLink>
      </li>
      }
    </ul>
  </nav>
);

export default Menu;
