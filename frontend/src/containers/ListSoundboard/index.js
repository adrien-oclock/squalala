import { connect } from 'react-redux';
import ListSounboard from 'src/components/ListSoundboard';
import { fetchSoundboards } from 'src/actions/soundboard';

const mapStateToProps = (state) => ({
  loading: state.soundboard.loading,
  soundboards: state.soundboard.list,
  tags: state.tag.list,
  isLogged: state.login.logged,
});

const mapDispatchToProps = (dispatch) => ({
  loadSoundboards: (search, tags, sortBy, order) => {
    dispatch(fetchSoundboards(search, tags, sortBy, order));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSounboard);
