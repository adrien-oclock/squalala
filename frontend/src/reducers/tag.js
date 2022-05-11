import { SAVE_TAGS } from 'src/actions/tag';

export const initialState = {
  list: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TAGS:
      return {
        ...state,
        list: action.tags,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
