/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation, NavLink } from 'react-router-dom';
import { getRating } from 'src/utils';
import CardSound from '../Card/Sound';
import Popup from '../Popup';

import './styles.scss';

const Soundboard = function (props) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [visibilityAdd, setVisibilityAdd] = useState(false);
  const [score, setScore] = useState(null);
  const soundboardId = searchParams.get('soundboard') ? parseInt(searchParams.get('soundboard')) : null;

  const popupCloseHandler = (e) => {
    setVisibilityAdd(e);
  };

  useEffect(() => {
    props.loadUser(id, soundboardId);
  }, [location, props.soundboard]);

  if (props.loading || (props.user && props.user.id != id)) {
    return 'Chargement';
  }

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
    if (props.soundboard.sounds.length > 0) {
      return (
        <>
          {props.soundboard.sounds.map((sound) => (
            <CardSound key={sound.id} id={sound.id} title={sound.title} text={sound.description} />
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
        return <CardSound key="sound-add" add />
      }

      const rating = getRating(props.soundboard);
      return <CardSound key="sound-rate" rating={rating} score={score} triggerRating={setNewRating} />
    }
  }

  const addSounboard = function(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const themes = [];

    const checkBoxes = e.target.getElementsByClassName('checkboxTheme');
    for (const item of checkBoxes) {
      if (item.checked) {
        themes.push(parseInt(item.value));
      }
    }
    props.handleAddSoundboard(title, description, themes);
    setVisibilityAdd(false);
  }

  return (
    <div className="profile">
      <section id="author">
        <h4>{props.user.username}</h4>
        <nav>
          <ul>
            {props.user.soundboard && soundboardElements()}
            {id == props.currentUser.id && 
              <li className="btn btn-secondary">
                <i className="fa fa-plus" onClick={() => setVisibilityAdd(!visibilityAdd)} aria-hidden="true" />
                <Popup onClose={popupCloseHandler} show={visibilityAdd}>
                  <section>
                    <h3>Ajouter une soundboard</h3>
                    <form className="formContainer" onSubmit={addSounboard}>
                      <div className="inputContainer">
                        <input type="text" name="title" id="soundboard-add-title" autoComplete="off" required />
                        <label htmlFor="soundboard-add-title">Titre</label>
                      </div>
                      <ul id="checkboxes">
                        {props.tags.map((tag) => (
                          <li key={`theme-${tag.id}`}>
                            <input type="checkbox" className="checkboxTheme" name="theme[]" value={tag.id} id={`theme-${tag.id}`} />
                            <label htmlFor={`theme-${tag.id}`}>{tag.title}</label>
                          </li>
                        ))}
                      </ul>
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
        {props.soundboard && soundElements()}
        {props.soundboard && soundAction()}
      </section>
    </div>
  );
};

export default Soundboard;
