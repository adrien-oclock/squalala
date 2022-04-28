import { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Card = function ({
  title, subtitle, info, text, themes, rating,
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
      && <i onClick={toggleFlip} className={`fa fa-${flip ? 'minus' : 'plus'}-circle`} />}
      <div className={`cardContent ${flip ? '' : 'visible'}`}>
        <p className="title">{title}</p>
        {subtitle
        && <p className="subtitle">{subtitle}</p>}
        {info
        && <p className="info">{info}</p>}
        {themes
        && (
        <ul className="theme">
          {themes.map((theme) => (
            <li key={theme.id}><a className="btn btn-secondary" href="#">{theme.name}</a></li>
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

Card.defaultProps = {
  subtitle: null,
  themes: null,
  rating: null,
  info: null,
  text: null,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  themes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  rating: PropTypes.number,
};

export default Card;
