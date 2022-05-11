import { combineReducers } from 'redux';

import userReducer from './user';
import soundboardReducer from './soundboard';
import tagReducer from './tag';

const rootReducer = combineReducers({
  soundboard: soundboardReducer,
  tag: tagReducer,
  user: userReducer,
});

export default rootReducer;
