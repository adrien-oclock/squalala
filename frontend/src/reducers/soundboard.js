import { SAVE_SOUNDBOARDS, FETCH_SOUNDBOARDS } from 'src/actions/soundboard';

export const initialState = {
  list: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    
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
