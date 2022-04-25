import { useEffect, useState } from "react";
import Popup from '../Popup';
import './styles.scss';

const Login = () => {
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  return (
  <div>
    <button onClick={(e) => setVisibility(!visibility)} type="button">Connexion</button>
    <Popup onClose={popupCloseHandler} show={visibility}>
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="modalContainer">
          <section id="register-form">
            <h3>Inscription</h3>
            <form className="formContainer">
              <div class="form-input-material">
                <input type="text" name="username" id="register-username" placeholder=" " autocomplete="off" class="form-control-material" required />
                <label for="register-username">Pseudo</label>
              </div>
              <div class="form-input-material">
                <input type="email" name="email" id="register-email" placeholder=" " autocomplete="off" class="form-control-material" required />
                <label for="register-email">Email</label>
              </div>
              <div class="form-input-material">
                <input type="password" name="password" id="register-password" placeholder=" " autocomplete="off" class="form-control-material" required />
                <label for="register-password">Mot de passe</label>
              </div>
              <div class="form-input-material">
                <input type="password" name="password" id="register-password-confirm" placeholder=" " autocomplete="off" class="form-control-material" required />
                <label for="register-password-confirm">Renseigner le même mot de passe</label>
              </div>
              <button type="submit" class="btn btn-primary btn-ghost">S'inscrire</button>
            </form>
          </section>
          <section id="login-form">
            <h3>Connexion</h3>
            <form className="formContainer">
              <div class="form-input-material">
                <input type="email" name="email" id="login-email" placeholder=" " autocomplete="off" class="form-control-material" required />
                <label for="login-email">Email</label>
              </div>
              <div class="form-input-material">
                <input type="password" name="password" id="login-password" placeholder=" " autocomplete="off" class="form-control-material" required />
                <label for="login-password">Mot de passe</label>
              </div>
              <button type="submit" class="btn btn-primary btn-ghost">Se connecter</button>
            </form>
          </section>
        </div>
      </div>
    </Popup>
  </div>
)};

export default Login;
