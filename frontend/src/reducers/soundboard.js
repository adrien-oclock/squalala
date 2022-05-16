import { 
  ADD_SOUNDBOARD,
  SAVE_SOUNDBOARD, 
  SAVE_SOUNDBOARDS, 
  FETCH_SOUNDBOARDS } from 'src/actions/soundboard';

export const initialState = {
  list: [],
  item: null,
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    
    case ADD_SOUNDBOARD:
      return {
        ...state,
        loading: true
      };

    case SAVE_SOUNDBOARD:
      return {
        ...state,
        item: action.soundboard,
        loading: false
      };

    case SAVE_SOUNDBOARDS:
      return {
        ...state,
        list: action.soundboards,
        loading: false
      };

    case FETCH_SOUNDBOARDS:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default reducer;
