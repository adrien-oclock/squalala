import { connect } from 'react-redux';
import Login from 'src/components/Login';

// on importe le composant de présentation
import { togglePopup } from 'src/actions/popup';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  togglePopupHandler: (newValue) => {
    dispatch(togglePopup(newValue));
  }
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Login);
