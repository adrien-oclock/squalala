import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';

import userMiddleware from 'src/middlewares/userMiddleware';
import soundboardMiddleware from 'src/middlewares/soundboardMiddleware';
import soundMiddleware from 'src/middlewares/soundMiddleware';
import tagMiddleware from 'src/middlewares/tagMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(userMiddleware),
  applyMiddleware(soundMiddleware),
  applyMiddleware(soundboardMiddleware),
  applyMiddleware(tagMiddleware),
);

const store = createStore(reducer, enhancers);

export default store;
