import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '../Header';
import Home from 'src/containers/Home';
import Error from '../Error';
import ListSoundboard from 'src/containers/ListSoundboard';
import ListUser from 'src/containers/ListUser';
import Soundboard from 'src/containers/Soundboard';
import Loader from '../Loader';

import './styles.scss';

// == Composant
const App = function(props) {

  // Only on init
  useEffect(() => {
    props.loadTags();
    props.connectUser();
  }, []);
  
  useEffect(() => {
    props.connectUser();
  }, [props.isLogged]);

  if (props.loading) {
    return <Loader />;
  }

  return (
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
  )
};

// == Export
export default App;
