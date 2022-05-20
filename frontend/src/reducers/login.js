import { 
  UPDATE_LOGIN_FIELD, 
  SAVE_USER_DATA, 
  CHECK_MATCHING_PASSWORD, 
  LOG_IN,
  LOG_IN_FROM_STORAGE,
  LOG_OUT,
  REGISTER,
 } from 'src/actions/user';
 import { api } from 'src/utils';

export const initialState = {
  logged: false, 
  loading: false,
  loading_storage: true,
  matching_password: true,
  reg_email: '',
  reg_username: '',
  reg_password: '',
  reg_password_bis: '',
  password: '',
  id: null,
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
        loading_storage: false,
      };

    case LOG_IN:
      return {
        ...state,
        loading: true,
      };
    
    case LOG_IN_FROM_STORAGE:
      return {
        ...state,
        loading_storage: true,
      };

    case LOG_OUT:
      localStorage.removeItem('user');
      api.defaults.headers.common.Authorization = null;

      return {
        ...state,
        logged: false,
        id: null,
        token: '',
      };

    case REGISTER:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
