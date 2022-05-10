import { connect } from 'react-redux';
import Popup from 'src/components/Popup';
import { togglePopup } from 'src/actions/popup';

const mapStateToProps = (state, ownProps) => ({
  show: state.popup.show,
  props: ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  togglePopupHandler: (newValue) => {
    dispatch(togglePopup(newValue));
  }
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
