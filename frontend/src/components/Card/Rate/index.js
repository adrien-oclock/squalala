import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { api } from 'src/utils';
import './styles.scss';

const CardRate = function ({
  rating,
  triggerRating,
  soundboardId,
  userId,
}) {
  const [score, setScore] = useState(null);
  const [stars, setStars] = useState([]);

  const ratingHandler = (e) => {
    const newRating = e.target.value;
    triggerRating(newRating);
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

  useEffect(() => {
    setRating(rating);
    api.get('likes/' + userId + '/' + soundboardId)
        .then((response) => {
          setScore(response.data.score);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            setScore(null);
          }
          else {
            console.warn(error);
          }
        });
  }, [soundboardId]);

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
