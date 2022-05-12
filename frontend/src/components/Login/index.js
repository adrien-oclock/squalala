/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import './styles.scss';

const Login = (props) => {

  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(false);
  }, [props.isLogged]);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    props.handleLogin();
  };

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    if (props.matching_password) {
      props.handleRegister();
    }
  };

  const handleChange = (evt) => {
    props.changeField(evt.target.value, evt.target.name);
    if (evt.target.name.startsWith('props.reg_password')) {
      props.handleMatchingPassword();
    }
  };

  if (props.isLogged) {
    return (
      <div id="login-container">
        <p>Bonjour {props.username}</p>
        <button className="btn btn-primary" onClick={() => props.handleDisconnect()} type="button">Déconnexion</button>
      </div>
    )
  }

  return (
    <div id="login-container">
      <button className="btn btn-primary" onClick={() => setVisibility(!visibility)} type="button">Connexion</button>
      <Popup onClose={popupCloseHandler} show={visibility}>
        {props.loading
          ? <section id="loading">CHARGEMENT</section>
          : <>
            <section id="register-form">
              <h3>Inscription</h3>
              <form className="formContainer" onSubmit={handleRegisterSubmit}>
                <div className="inputContainer">
                  <input type="text" name="reg_username" id="register-username" value={props.reg_username} onChange={handleChange} autoComplete="off" required />
                  <label htmlFor="register-username">Pseudo</label>
                </div>
                <div className="inputContainer">
                  <input type="email" name="reg_email" id="register-email" value={props.reg_email} onChange={handleChange} autoComplete="off" required />
                  <label htmlFor="register-email">Email</label>
                </div>
                <div className="inputContainer">
                  <input type="password" name="reg_password" id="register-password" value={props.reg_password} onChange={handleChange} autoComplete="off" required />
                  <label htmlFor="register-password">Mot de passe</label>
                </div>
                <div className="inputContainer">
                  <input type="password" name="reg_password_bis" id="register-password-confirm" value={props.reg_password_bis} onChange={handleChange} autoComplete="off" required />
                  <label htmlFor="register-password-confirm">Renseigner le même mot de passe</label>
                  <p>{!props.matching_password &&
                  'Les mots de passe ne correspondent pas'}</p>
                </div>
                <button type="submit" className="btn btn-primary">S'inscrire</button>
              </form>
            </section>
            <section id="login-form">
              <h3>Connexion</h3>
              <form className="formContainer" onSubmit={handleLoginSubmit}>
                <div className="inputContainer">
                  <input type="text" name="username" id="login-username" value={props.username} onChange={handleChange} autoComplete="off" required />
                  <label htmlFor="login-username">Pseudo</label>
                </div>
                <div className="inputContainer">
                  <input type="password" name="password" id="login-password" value={props.password} onChange={handleChange} autoComplete="off" required />
                  <label htmlFor="login-password">Mot de passe</label>
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
              </form>
            </section>
          </>
        }
      </Popup>
    </div>
  );
};

export default Login;
