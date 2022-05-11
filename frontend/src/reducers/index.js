import { combineReducers } from 'redux';

import userReducer from './user';
import soundboardReducer from './soundboard';

const rootReducer = combineReducers({
  soundboard: soundboardReducer,
  user: userReducer,
});

export default rootReducer;
