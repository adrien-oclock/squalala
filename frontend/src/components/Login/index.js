/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import './styles.scss';

const Login = () => {
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  return (
    <div>
      <button onClick={() => setVisibility(!visibility)} type="button">Connexion</button>
      <Popup onClose={popupCloseHandler} show={visibility}>
        <section id="register-form">
          <h3>Inscription</h3>
          <form className="formContainer">
            <div className="form-input-material">
              <input type="text" name="username" id="register-username" placeholder=" " autoComplete="off" className="form-control-material" required />
              <label htmlFor="register-username">Pseudo</label>
            </div>
            <div className="form-input-material">
              <input type="email" name="email" id="register-email" placeholder=" " autoComplete="off" className="form-control-material" required />
              <label htmlFor="register-email">Email</label>
            </div>
            <div className="form-input-material">
              <input type="password" name="password" id="register-password" placeholder=" " autoComplete="off" className="form-control-material" required />
              <label htmlFor="register-password">Mot de passe</label>
            </div>
            <div className="form-input-material">
              <input type="password" name="password" id="register-password-confirm" placeholder=" " autoComplete="off" className="form-control-material" required />
              <label htmlFor="register-password-confirm">Renseigner le même mot de passe</label>
            </div>
            <button type="submit" className="btn btn-primary btn-ghost">S'inscrire</button>
          </form>
        </section>
        <section id="login-form">
          <h3>Connexion</h3>
          <form className="formContainer">
            <div className="form-input-material">
              <input type="email" name="email" id="login-email" placeholder=" " autoComplete="off" className="form-control-material" required />
              <label htmlFor="login-email">Email</label>
            </div>
            <div className="form-input-material">
              <input type="password" name="password" id="login-password" placeholder=" " autoComplete="off" className="form-control-material" required />
              <label htmlFor="login-password">Mot de passe</label>
            </div>
            <button type="submit" className="btn btn-primary btn-ghost">Se connecter</button>
          </form>
        </section>
      </Popup>
    </div>
  );
};

export default Login;
