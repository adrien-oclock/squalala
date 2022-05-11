import axios from 'axios';
import { FETCH_SOUNDBOARDS, saveSoundboards } from 'src/actions/soundboard';

const soundboardMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_SOUNDBOARDS: {

      axios.get('http://localhost/tools/squalala/backend/public/api/v1/soundboards')
        .then((response) => {
          store.dispatch(saveSoundboards(response.data));
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
