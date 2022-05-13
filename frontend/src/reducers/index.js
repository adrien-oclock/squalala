import { combineReducers } from 'redux';

import loginReducer from './login';
import userReducer from './user';
import soundboardReducer from './soundboard';
import tagReducer from './tag';

const rootReducer = combineReducers({
  login: loginReducer,
  soundboard: soundboardReducer,
  tag: tagReducer,
  user: userReducer,
});

export default rootReducer;
