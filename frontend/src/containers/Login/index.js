import { connect } from 'react-redux';
import Login from 'src/components/Login';

// on importe le composant de présentation
import { logIn, register, updateLoginField } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  username: state.user.username,
  password: state.user.password,
  isLogged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateLoginField(newValue, name));
  },
  handleRegister: () => {
    dispatch(register());
  },
  handleLogin: () => {
    dispatch(logIn());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Login);
