import { connect } from 'react-redux';
import Menu from 'src/components/Menu';

const mapStateToProps = (state) => ({
  isLogged: state.login.logged,
  user: state.login,
});

const mapDispatchToProps = (dispatch) => ({
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
