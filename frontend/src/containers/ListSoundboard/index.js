import { connect } from 'react-redux';
import ListSounboard from 'src/components/ListSoundboard';
import { fetchSoundboards } from 'src/actions/soundboard';

const mapStateToProps = (state) => ({
  loading: state.soundboard.loading,
  soundboards: state.soundboard.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadSoundboards: () => {
    dispatch(fetchSoundboards());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSounboard);
