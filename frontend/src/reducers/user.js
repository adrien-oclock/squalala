import { UPDATE_LOGIN_FIELD, SAVE_USER_DATA } from '../actions/user';

export const initialState = {
  logged: false,
  email: '',
  password: '',
  username: '',
  token: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_LOGIN_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SAVE_USER_DATA:
      return {
        ...state,
        username: action.username,
        logged: action.isLogged,
        token: action.token,
      };

    default:
      return state;
  }
};

export default reducer;
