/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import './styles.scss';

const Login = ({changeField, handleLogin, handleRegister, username, password}) => {
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  const handleChange = (evt) => {
    changeField(evt.target.value, evt.target.name);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setVisibility(!visibility)} type="button">Connexion</button>
      <Popup onClose={popupCloseHandler} show={visibility}>
        <section id="register-form">
          <h3>Inscription</h3>
          <form className="formContainer" onSubmit={() => handleRegister}>
            <div className="inputContainer">
              <input type="text" name="username" id="register-username" autoComplete="off" required />
              <label htmlFor="register-username">Pseudo</label>
            </div>
            <div className="inputContainer">
              <input type="email" name="email" id="register-email" autoComplete="off" required />
              <label htmlFor="register-email">Email</label>
            </div>
            <div className="inputContainer">
              <input type="password" name="password" id="register-password" autoComplete="off" required />
              <label htmlFor="register-password">Mot de passe</label>
            </div>
            <div className="inputContainer">
              <input type="password" name="password" id="register-password-confirm" autoComplete="off" required />
              <label htmlFor="register-password-confirm">Renseigner le même mot de passe</label>
            </div>
            <button type="submit" className="btn btn-primary">S'inscrire</button>
          </form>
        </section>
        <section id="login-form">
          <h3>Connexion</h3>
          <form className="formContainer" onSubmit={handleLoginSubmit}>
            <div className="inputContainer">
              <input type="text" name="username" id="login-username" value={username} onChange={handleChange} autoComplete="off" required />
              <label htmlFor="login-username">Pseudo</label>
            </div>
            <div className="inputContainer">
              <input type="password" name="password" id="login-password" value={password} onChange={handleChange} autoComplete="off" required />
              <label htmlFor="login-password">Mot de passe</label>
            </div>
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </form>
        </section>
      </Popup>
    </div>
  );
};

export default Login;
