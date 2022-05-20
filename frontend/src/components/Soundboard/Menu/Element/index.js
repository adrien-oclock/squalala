/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'src/components/Popup';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const SoundboardMenuElement = function ({soundboard, loginId, userId, currentSoundboardId, tags, handleEditSoundboard, handleDeleteSoundboard}) {

  const [visibilityEdit, setVisibilityEdit] = useState(false);
  const editor = loginId == userId ? true : false;

  const popupCloseHandler = (e) => {
    setVisibilityEdit(e);
  };

  const handleChecked = (id) => {
    for (const tag of soundboard.tags) {
      if (id == tag.id) {
        return true;
      } 
    }
    return false;
  }

  const editSounboard = function(e) {
    e.preventDefault();
    const id = e.target.id.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const themes = [];

    const checkBoxes = e.target.getElementsByClassName('checkboxTheme');
    for (const item of checkBoxes) {
      if (item.checked) {
        themes.push(parseInt(item.value));
      }
    }
    handleEditSoundboard(id, title, description, themes);
    setVisibilityEdit(false);
  }

  const deleteSoundboard = function(e) {
    e.preventDefault();
    const id = parseInt(e.target.getAttribute("data-id"));
    handleDeleteSoundboard(id);
    setVisibilityEdit(false);
  }

  return (
    <li key={soundboard.id} className={`btn ${soundboard.id === currentSoundboardId ? 'btn-primary' : 'btn-secondary'} soundboardMenuElement`}>
      <NavLink to={`/profile/${userId}?soundboard=${soundboard.id}`}>{soundboard.title}</NavLink>
      {editor &&
        <div className="editSoundboard">
          <i className="fa fa-pencil" onClick={() => setVisibilityEdit(!visibilityEdit)} aria-hidden="true" />
          <Popup onClose={popupCloseHandler} show={visibilityEdit}>
            <section>
              <h3>Modifier le soundboard</h3>
              <form className="formContainer" onSubmit={editSounboard}>
                <input type="hidden" name="id" value={soundboard.id} />
                <div className="inputContainer">
                  <input type="text" name="title" id={`soundboard-edit-title-${soundboard.id}`} autoComplete="off" defaultValue={soundboard.title} />
                  <label htmlFor={`soundboard-edit-title-${soundboard.id}`}>Titre</label>
                </div>
                <div className="tagContainer">
                  <p>Themes</p>
                  <ul id="checkboxes" className="soundThemes">
                    {tags.map((tag) => (
                      <li key={`theme-${tag.id}`}>
                        <input type="checkbox" className="checkboxTheme" name="theme[]" value={tag.id} id={`theme-${tag.id}`} defaultChecked={handleChecked(tag.id)} />
                        <label htmlFor={`theme-${tag.id}`}>{tag.title}</label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="inputContainer">
                  <textarea name="description" id={`soundboard-edit-description-${soundboard.id}`} autoComplete="off" defaultValue={soundboard.description} />
                  <label htmlFor={`soundboard-edit-description-${soundboard.id}`}>Description</label>
                </div>
                <button type="submit" className="btn btn-primary">Modifier</button>
              </form>
              <button type="button" className="btn btn-primary delete" data-id={soundboard.id} onClick={deleteSoundboard}>Supprimer</button>
            </section>
          </Popup>
        </div>
      }
    </li>
  );
};

SoundboardMenuElement.defaultProps = {
  soundboards: [],
  userId: null,
  loginId: null,
  currentSoundboardId: null,
  tags: [],
};

SoundboardMenuElement.propTypes = {
  soundboards: PropTypes.array,
  userId: PropTypes.number,
  loginId: PropTypes.number,
  currentSoundboardId: PropTypes.number,
  tags: PropTypes.array,
  handleEditSoundboard: PropTypes.func,
  handleDeleteSoundboard: PropTypes.func,
};

export default SoundboardMenuElement;
