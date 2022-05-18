import { connect } from 'react-redux';
import App from 'src/components/App';

// on importe le composant de présentation
import { logInFromStorage } from 'src/actions/user';
import { fetchTags } from 'src/actions/tag';

const mapStateToProps = (state) => ({
  loading: state.tag.loading && state.login.loading_storage,
  tags: state.tag.list,
  isLogged: state.login.logged,
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
