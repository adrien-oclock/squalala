import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from '../../Popup';
import './styles.scss';

const CardAdd = function ({
  handleAddSound,
}) {
  const [visibilityAdd, setVisibilityAdd] = useState(false);
  
  const popupCloseHandler = (e) => {
    setVisibilityAdd(e);
  };

  const addSound = (e) => {
    e.preventDefault();
    handleAddSound(e);
    setVisibilityAdd(false);
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


CardAdd.propTypes = {
  handleAddSound: PropTypes.func,
};

export default CardAdd;
