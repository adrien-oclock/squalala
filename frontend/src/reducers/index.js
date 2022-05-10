import { combineReducers } from 'redux';

import popupReducer from './popup';

const rootReducer = combineReducers({
  popup: popupReducer,
});

export default rootReducer;
