import axios from 'axios';
import { ADD_SOUND } from 'src/actions/sound';
import { fetchSoundboard } from 'src/actions/soundboard';
import { formatData, api } from 'src/utils';

const soundMiddleware = (store) => (next) => (action) => {
  switch (action.type) {

    case ADD_SOUND: {
      const { id } = store.getState().soundboard.item;
      const { title, description, filename, position } = action;
      let endpoint = 'sounds';
      const params = {
        soundboard: parseInt(id),
        title: title,
        description: description,
        filename: filename,
        position: position,
      };

      api.post(endpoint, JSON.stringify(params))
        .then((response) => {
          console.log('Son ajouté')
          store.dispatch(fetchSoundboard(id));
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
