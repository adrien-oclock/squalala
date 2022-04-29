import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const CardSound = function ({
  title, text, add, rating,
}) {
  const [visibilityAdd, setVisibilityAdd] = useState(false);
  const [visibilityEdit, setVisibilityEdit] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibilityAdd(e);
    setVisibilityEdit(e);
  };

  const [flip, setFlip] = useState(false);
  const toggleFlip = () => setFlip(!flip);

  if (title) {
    return (
      <div className="cardContainer">
        {text
        && <i onClick={toggleFlip} className={`fa fa-${flip ? 'minus' : 'plus'}-circle tool right ${flip ? 'flipped' : ''}`} aria-hidden="true" />}
        <i onClick={() => setVisibilityEdit(!visibilityEdit)} className={`fa fa-pencil tool left ${flip ? 'flipped' : ''}`} aria-hidden="true" />
        <div className={`cardContent ${flip ? '' : 'visible'}`}>
          <p className="title">{title}</p>
        </div>
        {text
        && <div className={`verso ${flip ? 'visible' : ''}`}><p className="text">{text}</p></div>}
      </div>
    );
  }
  if (rating) {
    const [stars, setStars] = useState([]);

    const ratingHandler = (e) => {
      const newRating = e.target.value;
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
        <ul>{stars}</ul>
      </div>
    );
  }

  return (
    <div className="cardContainer add">
      <i onClick={() => setVisibilityAdd(!visibilityAdd)} className="fa fa-plus" aria-hidden="true" />
    </div>
  );
};

CardSound.defaultProps = {
  title: null,
  add: false,
  rating: null,
  text: null,
};

CardSound.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number,
  add: PropTypes.bool,
};

export default CardSound;
