import { connect } from 'react-redux';
import Soundboard from 'src/components/Soundboard';
import { fetchUser } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.item,
  currentUser: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: (userId) => {
    dispatch(fetchUser(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Soundboard);
