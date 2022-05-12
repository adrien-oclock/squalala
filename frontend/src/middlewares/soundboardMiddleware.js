import axios from 'axios';
import { FETCH_SOUNDBOARDS, saveSoundboards } from 'src/actions/soundboard';
import { formatData } from 'src/utils';

const soundboardMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_SOUNDBOARDS: {
      const { search, sortBy, order } = action;
      let endpoint = 'http://localhost/tools/squalala/backend/public/api/v1/soundboards';
      if (sortBy === 'like') {
        endpoint += '/likes'
      }
      endpoint += '/' + order;

      if (search) {
        endpoint += '?search=' + search;
      }

      axios.get(endpoint)
        .then((response) => {
          store.dispatch(saveSoundboards(formatData(response.data)));
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

export default soundboardMiddleware;
