import { connect } from 'react-redux';
import App from 'src/components/App';

// on importe le composant de présentation
import { logInFromStorage } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loading: state.login.loading,
});

const mapDispatchToProps = (dispatch) => ({
  connectUser: () => {
    dispatch(logInFromStorage());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(App);
