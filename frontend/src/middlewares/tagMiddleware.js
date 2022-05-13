import axios from 'axios';
import { FETCH_TAGS, saveTags } from 'src/actions/tag';
import { api } from 'src/utils';

const tagMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TAGS: {

      api.get('tags')
        .then((response) => {
          store.dispatch(saveTags(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default tagMiddleware;
