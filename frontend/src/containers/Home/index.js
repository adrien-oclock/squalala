import { connect } from 'react-redux';
import Home from 'src/components/Home';
import { fetchSoundboardsLasts, fetchSoundboardsTrending } from '../../actions/soundboard';

const mapStateToProps = (state) => ({
  loading: state.soundboard.loadingLasts && state.soundboard.loadingTrending,
  listLasts: state.soundboard.listLasts,
  listTrending: state.soundboard.listTrending,
  tags: state.tag.list,
  isLogged: state.login.logged,
});

const mapDispatchToProps = (dispatch) => ({
  loadSoundboardsLasts: () => {
    dispatch(fetchSoundboardsLasts());
  },
  loadSoundboardsTrending: () => {
    dispatch(fetchSoundboardsTrending());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
