/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation, NavLink } from 'react-router-dom';
import { getFirstSoundboardId, getSoundboardById } from 'src/utils';
import CardSound from '../Card/Sound';
import Popup from '../Popup';

import './styles.scss';

const Soundboard = function (props) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [visibilityAdd, setVisibilityAdd] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibilityAdd(e);
  };

  useEffect(() => {
    props.loadUser(id);
  }, [location]);

  if (props.loading || (props.user && props.user.id != id)) {
    return 'Chargement';
  }

  const soundboardId = searchParams.get('soundboard') ? parseInt(searchParams.get('soundboard')) : getFirstSoundboardId(props.user.soundboard);
  const soundboard = getSoundboardById(props.user.soundboard, soundboardId);
  const soundboardElements = function() {
    return (
      <>
        {props.user.soundboard.map((soundboard) => (
          <li key={soundboard.id} className={`btn ${soundboard.id === soundboardId ? 'btn-primary' : 'btn-secondary'}`}>
            <NavLink to={`/profile/${props.user.id}?soundboard=${soundboard.id}`}>{soundboard.title}</NavLink>
          </li>
        ))}
      </>
    );
  }

  const soundElements = function() {
    return (
      <>
        {soundboard.sounds.map((sound) => (
          <CardSound key={sound.id} id={sound.id} title={sound.title} text={sound.description} />
        ))}
      </>
    );
  }

  const soundAction = function() {
    if (id == props.currentUser.id) {
      return <CardSound key="sound-add" add />
    }

    let rating = 1;
    console.log(soundboard);
    if (soundboard && soundboard.rating) {
      rating = soundboard.rating;
    }
    return <CardSound key="sound-rate" rating={rating} />
  }

  return (
    <div className="profile">
      <section id="author">
        <h4>{props.user.username}</h4>
        <nav>
          <ul>
            {props.user.soundboard && soundboardElements()}
            {id == props.currentUser.id && 
              <li className="btn btn-secondary" onClick={() => setVisibilityAdd(!visibilityAdd)}>
                <i className="fa fa-plus" aria-hidden="true" />
                <Popup onClose={popupCloseHandler} show={visibilityAdd}>
                  <section>
                    <h3>Ajouter une soundboard</h3>
                    <form className="formContainer">
                      <div className="inputContainer">
                        <input type="text" name="title" id="soundboard-add-title" autoComplete="off" required />
                        <label htmlFor="soundboard-add-title">Titre</label>
                      </div>
                      <div className="inputContainer">
                        <textarea name="description" id="soundboard-add-description" autoComplete="off" required />
                        <label htmlFor="soundboard-add-description">Description</label>
                      </div>
                      <button type="submit" className="btn btn-primary">Ajouter</button>
                    </form>
                  </section>
                </Popup>
              </li>
            }
          </ul>
        </nav>
      </section>
      <section id="soundboard">
        {soundboard && soundElements()}
        {soundboard && soundAction()}
      </section>
    </div>
  );
};

export default Soundboard;
