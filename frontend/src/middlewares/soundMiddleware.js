import axios from 'axios';
import { ADD_SOUND, EDIT_SOUND, DELETE_SOUND } from 'src/actions/sound';
import { fetchSoundboard } from 'src/actions/soundboard';
import { formatData, api } from 'src/utils';

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
            filename: response.title,
            position: position,
          };

          api.post(endpoint, JSON.stringify(params))
          .then((response) => {
            console.log('Son ajouté')
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
      const { id, title, description, filename, position } = action;
      let endpoint = 'sounds/' + id;
      const params = {
        soundboard: parseInt(soundboard.item.id),
        title: title,
        description: description,
        filename: filename,
        position: position,
      };

      api.patch(endpoint, JSON.stringify(params))
        .then((response) => {
          console.log('Son modifié')
          store.dispatch(fetchSoundboard(soundboard.item.id));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case DELETE_SOUND: {
      const { soundboard } = store.getState();
      const { id } = action;
      let endpoint = 'sounds/' + id;

      api.delete(endpoint)
        .then((response) => {
          console.log('Son supprimé')
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
