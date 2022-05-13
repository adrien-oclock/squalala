import axios from 'axios';
import { 
  LOG_IN, 
  REGISTER, 
  FETCH_USER, 
  FETCH_USERS, 
  updateLoginField, 
  saveUserData, 
  saveUser, 
  saveUsers,
} from 'src/actions/user';
import { fetchSoundboard } from 'src/actions/soundboard';
import { formatData } from 'src/utils';

const userMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case REGISTER: {
      const { reg_username, reg_password, reg_email } = store.getState().login;

      axios.post(
        'http://localhost/tools/squalala/backend/public/api/v1/users',
        {
          username: reg_username,
          email: reg_email,
          password: reg_password,
        },
      )
        .then((response) => {

          store.dispatch(saveUserData(
            reg_username,
            reg_password,
            '',
          ));

          store.dispatch(updateLoginField(
            reg_username,
            'username',
          ));

          store.dispatch(updateLoginField(
            reg_password,
            'password',
          ));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case LOG_IN: {
      const { username, password } = store.getState().login;

      axios.post(
        'http://localhost/tools/squalala/backend/public/api/v1/login_check',
        {
          username: username,
          password: password,
        },
      )
        .then((response) => {

          store.dispatch(saveUserData(
            true,
            response.data.id,
            response.data.username,
            response.data.token,
          ));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case FETCH_USER: {
      const { userId } = action;
      let endpoint = 'http://localhost/tools/squalala/backend/public/api/v1/users/' + userId;

      axios.get(endpoint)
        .then((response) => {
          store.dispatch(saveUser(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case FETCH_USERS: {
      const { search, sortBy, order } = action;
      let endpoint = 'http://localhost/tools/squalala/backend/public/api/v1/users';
      if (sortBy === 'like') {
        endpoint += '/likes'
      }
      endpoint += '/' + order;

      const url = new URL(endpoint);
      url.search = new URLSearchParams({
        search: search
      })

      axios.get(url)
        .then((response) => {
          store.dispatch(saveUsers(formatData(response.data)));
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

export default userMiddleware;
