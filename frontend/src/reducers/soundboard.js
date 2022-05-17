import { 
  ADD_SOUNDBOARD,
  EDIT_SOUNDBOARD,
  SAVE_SOUNDBOARD, 
  FETCH_SOUNDBOARD,
  SAVE_SOUNDBOARDS, 
  FETCH_SOUNDBOARDS,
  FETCH_SOUNDBOARDS_LASTS,
  FETCH_SOUNDBOARDS_TRENDING,
  SAVE_SOUNDBOARDS_LASTS,
  SAVE_SOUNDBOARDS_TRENDING
 } from 'src/actions/soundboard';

export const initialState = {
  list: [],
  listLasts: [],
  listTrending: [],
  item: null,
  loading: true,
  loadingTrending: true,
  loadingLasts: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    
    case ADD_SOUNDBOARD:
      return {
        ...state,
        loading: true
      };

    case EDIT_SOUNDBOARD:
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

    case SAVE_SOUNDBOARDS_LASTS:
      return {
        ...state,
        listLasts: action.soundboards,
        loadingLasts: false
      };

    case SAVE_SOUNDBOARDS_TRENDING:
      return {
        ...state,
        listTrending: action.soundboards,
        loadingTrending: false
      };

    case FETCH_SOUNDBOARD:
      return {
        ...state,
        loading: true
      };

    case FETCH_SOUNDBOARDS:
      return {
        ...state,
        loading: true
      };

    case FETCH_SOUNDBOARDS_LASTS:
      return {
        ...state,
        loading_lasts: true
      };

    case FETCH_SOUNDBOARDS_TRENDING:
      return {
        ...state,
        loading_trending: true
      };

    default:
      return state;
  }
};

export default reducer;
