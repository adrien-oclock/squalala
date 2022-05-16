import axios from 'axios';
import { FETCH_SOUNDBOARDS, ADD_RATING, saveSoundboards } from 'src/actions/soundboard';
import { formatData, api } from 'src/utils';

const soundboardMiddleware = (store) => (next) => (action) => {
  switch (action.type) {

    case FETCH_SOUNDBOARDS: {
      const { search, tags, sortBy, order } = action;
      let endpoint = 'soundboards';
      if (sortBy === 'like') {
        endpoint += '/likes'
      }
      endpoint += '/' + order;

      api.get(endpoint, {params: {
        search: search,
        tag: tags
      }})
        .then((response) => {
          store.dispatch(saveSoundboards(formatData(response.data)));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case ADD_RATING: {
      const { id } = store.getState().login;
      const { rating, soundboardId } = action;
      let endpoint = 'likes';
      const params = {
        user: parseInt(id),
        soundboard: parseInt(soundboardId),
        score: parseInt(rating)
      };

      api.post(endpoint, JSON.stringify(params))
        .then((response) => {
          console.log('Mettre à jour le score total');
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
