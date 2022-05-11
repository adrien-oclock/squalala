import { UPDATE_LOGIN_FIELD, SAVE_USER_DATA, CHECK_MATCHING_PASSWORD, SAVE_USERS } from '../actions/user';

export const initialState = {
  logged: false, 
  loading: true,
  matching_password: true,
  reg_email: '',
  reg_username: '',
  reg_password: '',
  reg_password_bis: '',
  password: '',
  username: '',
  token: '',
  list: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_LOGIN_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };

    case CHECK_MATCHING_PASSWORD:
      let validate = false;
      if (state.reg_password === state.reg_password_bis) {
        validate = true;
      }
      return {
        ...state,
        matching_password: validate
      }

    case SAVE_USER_DATA:
      return {
        ...state,
        username: action.username,
        logged: action.isLogged,
        token: action.token,
      };

    case SAVE_USERS:
      return {
        ...state,
        list: action.users,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
