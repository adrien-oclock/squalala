import axios from 'axios';
import { 
  FETCH_SOUNDBOARD,
  FETCH_SOUNDBOARDS,
  FETCH_SOUNDBOARDS_LASTS,
  FETCH_SOUNDBOARDS_TRENDING, 
  ADD_RATING, 
  ADD_SOUNDBOARD, 
  EDIT_SOUNDBOARD,
  DELETE_SOUNDBOARD,
  saveSoundboard, 
  saveSoundboards,
  saveSoundboardsLasts,
  saveSoundboardsTrending,
 } from 'src/actions/soundboard';
import { getSoundboardById, formatData, api } from 'src/utils';
import { saveUser, logOut } from 'src/actions/user';

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
          if (error.response.status == 401) {
            store.dispatch(logOut());
          }
          console.warn(error);
        });
      break;
    }

    case FETCH_SOUNDBOARDS: {
      const { search, tags, sortBy, order, page } = action;
      let endpoint = 'soundboards';
      if (sortBy === 'like') {
        endpoint += '/likes'
      }
      endpoint += '/' + order;

      api.get(endpoint, {params: {
        search: search,
        tag: tags,
        page: page
      }})
        .then((response) => {
          store.dispatch(saveSoundboards(formatData(response.data.list), response.data.pagination));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            store.dispatch(logOut());
          }
          console.warn(error);
        });
      break;
    }

    case FETCH_SOUNDBOARDS_LASTS: {
      let endpoint = 'soundboards';

      api.get(endpoint, {params: {
        limit: 5,
      }})
        .then((response) => {
          store.dispatch(saveSoundboardsLasts(formatData(response.data.list)));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            store.dispatch(logOut());
          }
          console.warn(error);
        });
      break;
    }

    case FETCH_SOUNDBOARDS_TRENDING: {
      let endpoint = 'soundboards/likes';

      api.get(endpoint, {params: {
        limit: 5,
      }})
        .then((response) => {
          store.dispatch(saveSoundboardsTrending(formatData(response.data.list)));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            store.dispatch(logOut());
          }
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
          if (error.response.status == 401) {
            store.dispatch(logOut());
          }
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
          if (error.response.status == 401) {
            store.dispatch(logOut());
          }
          console.warn(error);
        });
      break;
    }

    case DELETE_SOUNDBOARD: {
      const { id } = action;
      let endpoint = 'soundboards/' + id;

      api.delete(endpoint)
        .then((response) => {
          store.dispatch(saveSoundboard(null));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            store.dispatch(logOut());
          }
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
        .then(() => {
          api.get('users/' + id)
            .then((response) => {
              const data = formatData(response.data);
              store.dispatch(saveUser(data[0]));
            })
            .then(() => {
              const { item } = store.getState().user;
              const soundboard = getSoundboardById(item.soundboard, soundboardId);
              store.dispatch(saveSoundboard(soundboard));
            })
            .catch((error) => {
              if (error.response.status == 401) {
                store.dispatch(logOut());
              }
              console.warn(error);
            });
        })
        .catch((error) => {
          if (error.response.status == 401) {
            store.dispatch(logOut());
          }
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
