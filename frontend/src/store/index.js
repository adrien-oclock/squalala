import { createStore } from 'redux';
// outil pour faire le lien entre notre store et le redux dev tool (il faut aussi
// avoir installé l'extension dans le navigateur)
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducer from './reducer';

/*
le store est le "gardien" de notre state : il le stocke et il le protège (il
autorisera seulement certaines modifications)
*/
const store = createStore(
  // reducer
  reducer,
  // enhancer
  devToolsEnhancer(),
);
export default store;
