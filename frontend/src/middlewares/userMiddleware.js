import { 
  LOG_IN, 
  LOG_IN_FROM_STORAGE,
  REGISTER, 
  FETCH_USER, 
  FETCH_USERS, 
  updateLoginField, 
  saveUserData, 
  saveUser, 
  saveUsers,
  logOut,
} from 'src/actions/user';
import { formatData, api, getSoundboardById } from 'src/utils';
import { saveSoundboard } from '../actions/soundboard';

const userMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case REGISTER: {
      const { reg_username, reg_password, reg_email } = store.getState().login;

      api.post(
        'users',
        {
          username: reg_username,
          email: reg_email,
          password: reg_password,
        },
      )
        .then(() => {

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

      api.post(
        'login_check',
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

          localStorage.setItem('user', JSON.stringify({
            'id': response.data.id,
            'username': response.data.username,
            'token': response.data.token,
          }));

          // From now on headers auth are sent
          api.defaults.headers.common.Authorization = `bearer ${response.data.token}`;
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }

    case LOG_IN_FROM_STORAGE: {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        store.dispatch(saveUserData(
          true,
          user.id,
          user.username,
          user.token,
        ));
        api.defaults.headers.common.Authorization = `bearer ${user.token}`;
      } else {
        store.dispatch(saveUserData(
          false,
          null,
          '',
          '',
        ));
      }

      break;
    }

    case FETCH_USER: {
      const { userId, soundboardId } = action;

      api.get('users/' + userId)
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
      break;
    }

    case FETCH_USERS: {
      const { search, sortBy, order, page } = action;
      let endpoint = 'users';
      if (sortBy === 'like') {
        endpoint += '/likes'
      }
      endpoint += '/' + order;

      api.get(endpoint, {params: {
        search: search,
        page: page
      }})
        .then((response) => {
          store.dispatch(saveUsers(formatData(response.data.list), response.data.pagination));
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

export default userMiddleware;
