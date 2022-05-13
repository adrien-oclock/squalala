import { 
  SAVE_USER, 
  FETCH_USER,
  SAVE_USERS, 
  FETCH_USERS,
 } from '../actions/user';

export const initialState = {
  loading: true,
  list: [],
  item: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true
      };

    case SAVE_USER:
      return {
        ...state,
        item: action.user,
        loading: false
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
