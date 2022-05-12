import { connect } from 'react-redux';
import Login from 'src/components/Login';

// on importe le composant de présentation
import { logIn, logOut, register, updateLoginField, checkMatchingPassword } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  reg_email: state.user.reg_email,
  reg_username: state.user.reg_username,
  reg_password: state.user.reg_password,
  reg_password_bis: state.user.reg_password_bis,
  matching_password: state.user.matching_password,
  username: state.user.username,
  password: state.user.password,
  isLogged: state.user.logged,
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
