/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { getRating, getBase64 } from 'src/utils';
import CardSound from '../Card/Sound';
import SoundboardMenu from './Menu';

import './styles.scss';

const Soundboard = function (props) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [score, setScore] = useState(null);
  const soundboardId = searchParams.get('soundboard') ? parseInt(searchParams.get('soundboard')) : null;

  useEffect(() => {
    props.loadUser(id, soundboardId);
  }, [location, JSON.stringify(props.soundboard)]);

  if (props.loading || (props.user && props.user.id != id)) {
    return 'Chargement';
  }

  const addHandler = (e) => {
    const title = e.target.title.value;
    const description = e.target.description.value;
    const position = props.soundboard.sounds.length + 1;
    const files = e.target.file.files;
    getBase64(files[0]).then((data) => {
      const filename = files[0].name;
      const fileData = {
        filename: filename,
        file: data,
      }
      props.handleAddSound(title, description, fileData, position);
    });
  }

  const editHandler = (e) => {
    const id = e.target.id.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const position = 2;
    const files = e.target.file.files;
    if (files) {
      getBase64(files[0]).then((data) => {
        const filename = files[0].name;
        const fileData = {
          filename: filename,
          file: data,
        }
        props.handleEditSound(id, title, description, fileData, position);
      });
    }
    else {
      props.handleEditSound(id, title, description, null, position);
    }
  };

  const deleteHandler = (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    props.handleDeleteSound(id);
  };

  const soundElements = function() {
    if (props.soundboard.sounds.length > 0) {
      return (
        <>
          {props.soundboard.sounds.map((sound) => (
            <CardSound key={sound.id} id={sound.id} title={sound.title} text={sound.description} file={sound.filename} edit={props.user.id == props.currentUser.id} handleEditSound={editHandler} handleDeleteSound={deleteHandler} />
          ))}
        </>
      );
    }
    return (
      <p>
        Aucun son disponible
      </p>
    );
  }

  const setNewRating = function(newRating) {
    newRating = parseInt(newRating);
    props.handleRating(newRating, soundboardId);
    setScore(newRating);
  }

  const soundAction = function() {
    if (props.currentUser.id) {
      if (id == props.currentUser.id) {
        return <CardSound key="sound-add" add handleAddSound={addHandler} />
      }

      const rating = getRating(props.soundboard);
      return <CardSound key="sound-rate" rating={rating} score={score} triggerRating={setNewRating} />
    }
  }

  return (
    <div className="profile">
      <section id="author">
        <h4>{props.user.username}</h4>
        <SoundboardMenu 
        soundboards={props.user.soundboard} 
        loginId={parseInt(props.currentUser.id)} 
        userId={parseInt(id)} 
        currentSoundboardId={soundboardId} 
        tags={props.tags} 
        handleAddSoundboard={props.handleAddSoundboard}
        handleEditSoundboard={props.handleEditSoundboard}
        handleDeleteSoundboard={props.handleDeleteSoundboard} />
      </section>
      <section id="soundboard">
        {props.soundboard && soundElements()}
        {props.soundboard && soundAction()}
      </section>
    </div>
  );
};

export default Soundboard;
