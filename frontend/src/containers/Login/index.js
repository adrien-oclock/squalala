import { connect } from 'react-redux';
import Login from 'src/components/Login';

// on importe le composant de présentation
import { logIn, logOut, register, updateLoginField, checkMatchingPassword } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  reg_email: state.login.reg_email,
  reg_username: state.login.reg_username,
  reg_password: state.login.reg_password,
  reg_password_bis: state.login.reg_password_bis,
  matching_password: state.login.matching_password,
  username: state.login.username,
  password: state.login.password,
  isLogged: state.login.logged,
});

const mapDispatchToProps = (dispatch) => ({
  handleMatchingPassword: () => {
    dispatch(checkMatchingPassword());
  },
  changeField: (newValue, name) => {
    dispatch(updateLoginField(newValue, name));
  },
  handleRegister: () => {
    dispatch(register());
  },
  handleLogin: () => {
    dispatch(logIn());
  },
  handleDisconnect: () => {
    dispatch(logOut());
  }
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Login);
