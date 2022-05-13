import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import Home from 'src/containers/Home';
import Error from '../Error';
import ListSoundboard from 'src/containers/ListSoundboard';
import ListUser from 'src/containers/ListUser';
import Soundboard from 'src/containers/Soundboard';

import './styles.scss';

// == Composant
const App = () => (
  <div className="app">
    <Header title="Squalala" />
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/soundboard" exact element={<ListSoundboard />} />
      <Route path="/user" exact element={<ListUser />} />
      <Route path="/profile/:id" element={<Soundboard />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </div>
);

// == Export
export default App;
