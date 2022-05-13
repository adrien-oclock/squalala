import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

const CardSoundboard = function ({
  title, subtitle, info, text, themes, rating, url,
}) {
  const stars = [];
  if (rating) {
    for (let i = 1; i <= 5; i += 1) {
      if (i <= rating) {
        stars.push(<span key={i} className="fa fa-star checked" />);
      }
      else {
        stars.push(<span key={i} className="fa fa-star" />);
      }
    }
  }

  const [flip, setFlip] = useState(false);
  const toggleFlip = () => setFlip(!flip);
  return (
    <div className="cardContainer">
      {text
      && <i onClick={toggleFlip} className={`fa fa-${flip ? 'minus' : 'plus'}-circle tool right ${flip ? 'flipped' : ''}`} aria-hidden="true" />}
      <div className={`cardContent ${flip ? '' : 'visible'}`}>
        <NavLink className="title" to={url}>{title}</NavLink>
        {subtitle
        && <p className="subtitle">{subtitle}</p>}
        {info
        && <p className="info">{info}</p>}
        {themes
        && (
        <ul className="theme">
          {themes.map((theme) => (
            <li key={theme.id}><a className="btn btn-secondary" href="#">{theme.title}</a></li>
          ))}
        </ul>
        )}
        {rating
        && <p className="rating">{stars}</p>}
      </div>
      {text
      && <div className={`verso ${flip ? 'visible' : ''}`}><p className="text">{text}</p></div>}
    </div>
  );
};

CardSoundboard.defaultProps = {
  subtitle: null,
  themes: null,
  rating: null,
  info: null,
  text: null,
};

CardSoundboard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  themes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  rating: PropTypes.number,
};

export default CardSoundboard;
