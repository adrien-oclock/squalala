import { connect } from 'react-redux';
import App from 'src/components/App';

// on importe le composant de présentation
import { logInFromStorage } from 'src/actions/user';
import { fetchTags } from 'src/actions/tag';

const mapStateToProps = (state) => ({
  loading: state.tag.loading,
  tags: state.tag.list,
});

const mapDispatchToProps = (dispatch) => ({
  connectUser: () => {
    dispatch(logInFromStorage());
  },
  loadTags: () => {
    dispatch(fetchTags());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(App);
