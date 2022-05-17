import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from '../../Popup';
import { getSoundUrl } from 'src/utils';
import './styles.scss';

const CardSound = function ({
  title, 
  text, 
  file, 
  rating,
  score, 
  id, 
  edit,
  triggerRating, 
  handleAddSound,
  handleEditSound,
  handleDeleteSound,
}) {
  const [visibilityAdd, setVisibilityAdd] = useState(false);
  const [visibilityEdit, setVisibilityEdit] = useState(false);
  const url = file ? getSoundUrl(file) : null;
  const [audio] = url ? useState(new Audio(url)) : useState(false);
  const playFile = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  const popupCloseHandler = (e) => {
    setVisibilityAdd(e);
    setVisibilityEdit(e);
  };

  const [flip, setFlip] = useState(false);
  const toggleFlip = () => setFlip(!flip);

  const addSound = (e) => {
    e.preventDefault();
    handleAddSound(e);
    setVisibilityAdd(false);
  }
  
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

  if (title) {
    return (
      <div className="cardContainer">
        {text
        &&
        <i onClick={toggleFlip} className={`fa fa-${flip ? 'minus' : 'plus'}-circle tool right ${flip ? 'flipped' : ''}`} aria-hidden="true" />}
        {editTool()}
        <div className={`cardContent ${flip ? '' : 'visible'}`} onClick={playFile}>
          <p className="title">{title}</p>
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
  }
  if (rating) {
    const [stars, setStars] = useState([]);

    const ratingHandler = (e) => {
      const newRating = e.target.value;

      triggerRating(newRating);
      // eslint-disable-next-line no-use-before-define
      setRating(newRating);
    };

    const setRating = (checkedValue) => {
      const newStars = [];

      for (let i = 1; i <= 5; i += 1) {
        let checked = false;
        if (i <= checkedValue) {
          checked = true;
        }

        newStars.push(
          <li key={i}>
            <input type="radio" id={`rating-${i}`} name="rating" value={i} onChange={ratingHandler} defaultChecked={i === checkedValue} />
            <label htmlFor={`rating-${i}`}>
              <i className={`fa fa-star ${checked ? 'fill' : ''}`} aria-hidden="true" />
            </label>
          </li>,
        );
      }

      setStars(newStars);
    };

    // Only on initial render
    useEffect(() => {
      setRating(rating);
    }, []);

    return (
      <div className="cardContainer rate">
        <div className="cardContent visible">
          {score &&
          <p>Vous avez mis la note de {score}</p>
          }
          <ul>{stars}</ul>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cardContainer add">
      <i onClick={() => setVisibilityAdd(!visibilityAdd)} className="fa fa-plus" aria-hidden="true" />
      <Popup onClose={popupCloseHandler} show={visibilityAdd}>
        <section id="add-sound">
          <h3>Ajout de son</h3>
          <form className="formContainer" onSubmit={addSound}>
            <div className="inputContainer">
              <input type="text" name="title" id="add-title" autoComplete="off" required />
              <label htmlFor="add-title">Titre</label>
            </div>
            <div className="inputContainer">
              <textarea name="description" id="add-description" autoComplete="off" required />
              <label htmlFor="add-description">Description</label>
            </div>
            <div className="inputContainer">
              <input type="file" name="file" id="add-file" required />
              <label htmlFor="add-file">Fichier</label>
            </div>
            <button type="submit" className="btn btn-primary">Ajouter</button>
          </form>
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
  rating: null,
  score: null,
  text: null,
};

CardSound.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  file: PropTypes.string,
  rating: PropTypes.number,
  score: PropTypes.number,
  edit: PropTypes.bool,
  triggerRating: PropTypes.func,
  handleAddSound: PropTypes.func,
  handleEditSound: PropTypes.func,
  handleDeleteSound: PropTypes.func,
};

export default CardSound;
