import { SAVE_SOUNDBOARDS } from 'src/actions/soundboard';

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

    default:
      return state;
  }
};

export default reducer;
