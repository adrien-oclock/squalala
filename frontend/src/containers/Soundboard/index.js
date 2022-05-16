import { connect } from 'react-redux';
import Soundboard from 'src/components/Soundboard';
import { fetchUser } from 'src/actions/user';
import { addSound, editSound, deleteSound } from 'src/actions/sound';
import { addRating, addSoundboard} from 'src/actions/soundboard';

const mapStateToProps = (state) => ({
  loading: state.user.loading && state.soundboard.loading,
  user: state.user.item,
  currentUser: state.login,
  soundboard: state.soundboard.item,
  tags: state.tag.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: (userId, soundboardId) => {
    dispatch(fetchUser(userId, soundboardId));
  },
  handleRating: (rating, soundboardId) => {
    dispatch(addRating(rating, soundboardId));
  },
  handleAddSoundboard: (title, description, tags) => {
    dispatch(addSoundboard(title, description, tags));
  },
  handleAddSound: (title, description, fileData, position) => {
    dispatch(addSound(title, description, fileData, position));
  },
  handleEditSound: (id, title, description, filename, position) => {
    dispatch(editSound(id, title, description, filename, position));
  },
  handleDeleteSound: (id) => {
    dispatch(deleteSound(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Soundboard);
