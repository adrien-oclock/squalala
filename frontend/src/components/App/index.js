import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import Home from '../Home';
import Error from '../Error';
import ListSoundboard from '../ListSoundboard';
import ListUser from '../ListUser';

import './styles.scss';

// == Composant
const App = () => (
  <div className="app">
    <Header title="Squalala" />
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/soundboard" exact element={<ListSoundboard />} />
      <Route path="/user" exact element={<ListUser />} />
      {/* <Route path="/soundboard/:id">
        <Soundboard />
      </Route> */}
      <Route path="*" element={<Error />} />
    </Routes>
  </div>
);

// == Export
export default App;
