import axios from 'axios';
import { LOG_IN, saveUserData } from '../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case LOG_IN: {
      const { username, password } = store.getState().user;

      axios.post(
        'http://localhost/tools/squalala/backend/public/api/v1/login_check',
        {
          username: username,
          password: password,
        },
      )
        .then((response) => {

          store.dispatch(saveUserData(
            username,
            password,
            response.data.token,
          ));
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
