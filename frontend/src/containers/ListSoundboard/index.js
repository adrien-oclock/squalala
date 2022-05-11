import { connect } from 'react-redux';
import ListSounboard from 'src/components/ListSoundboard';
import { fetchSoundboards } from 'src/actions/soundboard';
import { fetchTags } from 'src/actions/tag';

const mapStateToProps = (state) => ({
  loading: state.soundboard.loading && state.soundboard.loading,
  soundboards: state.soundboard.list,
  tags: state.tag.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadTags: () => {
    dispatch(fetchTags());
  },
  loadSoundboards: () => {
    dispatch(fetchSoundboards());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSounboard);
