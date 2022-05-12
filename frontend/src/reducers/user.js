import { 
  UPDATE_LOGIN_FIELD, 
  SAVE_USER_DATA, 
  CHECK_MATCHING_PASSWORD, 
  SAVE_USERS, 
  FETCH_USERS,
  LOG_IN,
  LOG_OUT,
  REGISTER,
 } from '../actions/user';

export const initialState = {
  logged: false, 
  loading: false,
  matching_password: true,
  reg_email: '',
  reg_username: '',
  reg_password: '',
  reg_password_bis: '',
  password: '',
  id: null,
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
        id: action.id,
        username: action.username,
        logged: action.isLogged,
        token: action.token,
        loading: false,
      };

    case LOG_IN:
      return {
        ...state,
        loading: true,
      };

    case LOG_OUT:
      return {
        ...state,
        logged: false,
        token: '',
      };

    case REGISTER:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS:
      return {
        ...state,
        loading: true
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
