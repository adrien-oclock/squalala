import { connect } from 'react-redux';
import Soundboard from 'src/components/Soundboard';
import { fetchUser } from 'src/actions/user';
import { addRating } from 'src/actions/soundboard';

const mapStateToProps = (state) => ({
  loading: state.user.loading && state.soundboard.loading,
  user: state.user.item,
  currentUser: state.login,
  soundboard: state.soundboard.item,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: (userId, soundboardId) => {
    dispatch(fetchUser(userId, soundboardId));
  },
  handleRating: (rating, soundboardId) => {
    dispatch(addRating(rating, soundboardId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Soundboard);
