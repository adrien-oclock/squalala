import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from '../../Popup';
import { getSoundUrl } from 'src/utils';
import './styles.scss';

const CardSound = function ({
  title, 
  text, 
  file, 
  id, 
  edit,
  handleEditSound,
  handleDeleteSound,
}) {
  const [visibilityEdit, setVisibilityEdit] = useState(false);
  const url = file ? getSoundUrl(file) : null;
  const [audio, setAudio] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  const playFile = () => {
    if (audio) {
      setPlaying(true);
      audio.currentTime = 0;
      audio.play();
    }
  }

  if (audio) {
    audio.onended = () => {
      setPlaying(false);
    }
  }

  const popupCloseHandler = (e) => {
    setVisibilityEdit(e);
  };

  const [flip, setFlip] = useState(false);
  const toggleFlip = () => setFlip(!flip);
  
  const editSound = (e) => {
    e.preventDefault();
    handleEditSound(e);
    setVisibilityEdit(false);
  }

  const deleteSound = (e) => {
    e.preventDefault();
    handleDeleteSound(e);
    setVisibilityEdit(false);
  }

  const editTool = () => {
    if (edit) {
      return <i onClick={() => setVisibilityEdit(!visibilityEdit)} className={`fa fa-pencil tool left ${flip ? 'flipped' : ''}`} aria-hidden="true" />
    }
  }

  return (
    <div className="cardContainer sound">
      {text
      &&
      <i onClick={toggleFlip} className={`fa fa-${flip ? 'minus' : 'plus'}-circle tool right ${flip ? 'flipped' : ''}`} aria-hidden="true" />}
      {editTool()}
      <div className={`cardContent ${flip ? '' : 'visible'}`} onClick={playFile}>
        <p className={`title ${playing ? 'active' : ''}`}>{title}</p>
      </div>
      {text
      && <div className={`verso ${flip ? 'visible' : ''}`}><p className="text">{text}</p></div>}
      <Popup onClose={popupCloseHandler} show={visibilityEdit}>
        <section>
          <h3>Modifier le son</h3>
          <form className="formContainer" onSubmit={editSound}>
            <input type="hidden" name="id" value={id} />
            <div className="inputContainer">
              <input type="text" name="title" id={`edit-title-${id}`} defaultValue={title} autoComplete="off" required />
              <label htmlFor={`edit-title-${id}`}>Titre</label>
            </div>
            <div className="inputContainer">
              <textarea name="description" id={`edit-description-${id}`} defaultValue={text} autoComplete="off" required />
              <label htmlFor={`edit-description-${id}`}>Description</label>
            </div>
            <div className="inputContainer">
              <input type="file" name="file" id={`edit-file-${id}`} />
              <label htmlFor={`edit-file-${id}`}>Fichier</label>
            </div>
            <button type="submit" className="btn btn-primary">Modifier</button>
          </form>
          <button type="button" className="btn btn-primary delete" data-id={id} onClick={deleteSound}>Supprimer</button>
        </section>
      </Popup>
    </div>
  );
};

CardSound.defaultProps = {
  id: null,
  title: null,
  file: null,
  edit: false,
  text: null,
};

CardSound.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  file: PropTypes.string,
  edit: PropTypes.bool,
  handleEditSound: PropTypes.func,
  handleDeleteSound: PropTypes.func,
};

export default CardSound;
