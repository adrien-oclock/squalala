import { TOGGLE_POPUP } from 'src/actions/popup';

export const initialState = {
  show: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_POPUP:
      return {
        ...state,
        show: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
