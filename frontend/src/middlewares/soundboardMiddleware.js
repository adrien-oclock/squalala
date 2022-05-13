import axios from 'axios';
import { FETCH_SOUNDBOARDS, saveSoundboards } from 'src/actions/soundboard';
import { formatData } from 'src/utils';

const soundboardMiddleware = (store) => (next) => (action) => {
  switch (action.type) {

    case FETCH_SOUNDBOARDS: {
      const { search, tags, sortBy, order } = action;
      let endpoint = 'http://localhost/tools/squalala/backend/public/api/v1/soundboards';
      if (sortBy === 'like') {
        endpoint += '/likes'
      }
      endpoint += '/' + order;

      const url = new URL(endpoint);
      url.search = new URLSearchParams({
        search: search,
        tag: tags
      })

      axios.get(url)
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
