/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SoundboardMenuElement from './Element';
import Popup from 'src/components/Popup';

const SoundboardMenu = function ({soundboards, loginId, userId, currentSoundboardId, tags, handleAddSoundboard, handleEditSoundboard, handleDeleteSoundboard}) {

  const [visibilityAdd, setVisibilityAdd] = useState(false);
  const editor = loginId == userId ? true : false;

  const popupCloseHandler = (e) => {
    setVisibilityAdd(e);
  };

  const soundboardElements = function() {
    if (!currentSoundboardId && soundboards.length > 0) {
      currentSoundboardId = soundboards[0].id;
    }
    return (
      <>
        {soundboards.map((soundboard) => (
          <SoundboardMenuElement 
          soundboard={soundboard} 
          userId={userId} 
          loginId={loginId} 
          currentSoundboardId={currentSoundboardId} 
          tags={tags} 
          handleEditSoundboard={handleEditSoundboard} 
          handleDeleteSoundboard={handleDeleteSoundboard}
          key={soundboard.id} />
        ))}
      </>
    );
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
    handleAddSoundboard(title, description, themes);
    setVisibilityAdd(false);
  }

  return (
    <nav>
      <ul>
        {soundboards && soundboardElements()}
        {editor && 
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
                  {tags.map((tag) => (
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
  );
};

SoundboardMenu.defaultProps = {
  soundboards: [],
  loginId: null,
  userId: null,
  currentSoundboardId: null,
  tags: [],
};

SoundboardMenu.propTypes = {
  soundboards: PropTypes.array,
  loginId: PropTypes.number,
  userId: PropTypes.number,
  currentSoundboardId: PropTypes.number,
  tags: PropTypes.array,
  handleAddSoundboard: PropTypes.func,
  handleEditSoundboard: PropTypes.func,
  handleDeleteSoundboard: PropTypes.func,
};

export default SoundboardMenu;
