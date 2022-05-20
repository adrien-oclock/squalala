import { ADD_SOUND, EDIT_SOUND, DELETE_SOUND } from 'src/actions/sound';
import { fetchSoundboard } from 'src/actions/soundboard';
import { api } from 'src/utils';

const soundMiddleware = (store) => (next) => (action) => {
  switch (action.type) {

    case ADD_SOUND: {
      const { soundboard } = store.getState();
      const { title, description, fileData, position } = action;
      let endpoint = 'sounds';

      api.post(endpoint + '/upload', JSON.stringify(fileData))
        .then((response) => {
          const params = {
            soundboard: parseInt(soundboard.item.id),
            title: title,
            description: description,
            filename: response.data.title,
            position: position,
          };

          api.post(endpoint, JSON.stringify(params))
          .then(() => {
            store.dispatch(fetchSoundboard(soundboard.item.id));
          })
          .catch((error) => {
            console.warn(error);
          });
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case EDIT_SOUND: {
      const { soundboard } = store.getState();
      const { id, title, description, fileData, position } = action;
      const endpoint = 'sounds';
      const params = {
        soundboard: parseInt(soundboard.item.id),
        title: title,
        description: description,
        position: position,
      };

      if (fileData) {
        api.post(endpoint + '/upload', JSON.stringify(fileData))
        .then((response) => {
          params.filename = response.data.title;

          api.patch(endpoint + '/' + id, JSON.stringify(params))
          .then(() => {
            store.dispatch(fetchSoundboard(soundboard.item.id));
          })
          .catch((error) => {
            console.warn(error);
          });
        })
        .catch((error) => {
          console.warn(error);
        });
      } else {
        api.patch(endpoint + '/' + id, JSON.stringify(params))
        .then(() => {
          store.dispatch(fetchSoundboard(soundboard.item.id));
        })
        .catch((error) => {
          console.warn(error);
        });
      }

      break;
    }

    case DELETE_SOUND: {
      const { soundboard } = store.getState();
      const { id } = action;
      let endpoint = 'sounds/' + id;

      api.delete(endpoint)
        .then(() => {
          store.dispatch(fetchSoundboard(soundboard.item.id));
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

export default soundMiddleware;
