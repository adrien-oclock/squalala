import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CardRate = function ({
  rating,
  score, 
  triggerRating, 
}) {
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
};

CardRate.defaultProps = {
  rating: null,
  score: null,
};

CardRate.propTypes = {
  rating: PropTypes.number,
  score: PropTypes.number,
};

export default CardRate;
