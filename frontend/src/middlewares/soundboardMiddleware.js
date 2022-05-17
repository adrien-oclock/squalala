import axios from 'axios';
import { 
  FETCH_SOUNDBOARD,
  FETCH_SOUNDBOARDS, 
  ADD_RATING, 
  ADD_SOUNDBOARD, 
  EDIT_SOUNDBOARD,
  DELETE_SOUNDBOARD,
  saveSoundboard, 
  saveSoundboards } from 'src/actions/soundboard';
import { formatData, api } from 'src/utils';

const soundboardMiddleware = (store) => (next) => (action) => {
  switch (action.type) {

    case FETCH_SOUNDBOARD: {
      const { id } = action;
      let endpoint = 'soundboards/' + id;

      api.get(endpoint)
        .then((response) => {
          store.dispatch(saveSoundboard(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

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

    case ADD_SOUNDBOARD: {
      const { id } = store.getState().login;
      const { title, description, tags } = action;
      let endpoint = 'soundboards';
      const params = {
        user: parseInt(id),
        title: title,
        description: description,
        tags: tags,
      };

      api.post(endpoint, JSON.stringify(params))
        .then((response) => {
          store.dispatch(saveSoundboard(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case EDIT_SOUNDBOARD: {
      const { id, title, description, tags } = action;
      let endpoint = 'soundboards/' + id;
      const params = {
        title: title,
        description: description,
        tags: tags,
      };

      api.patch(endpoint, JSON.stringify(params))
        .then((response) => {
          store.dispatch(saveSoundboard(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case DELETE_SOUNDBOARD: {
      const { id } = action;
      const { login } = store.getState();
      let endpoint = 'soundboards/' + id;

      api.delete(endpoint)
        .then((response) => {
          store.dispatch(saveSoundboard(null));
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
