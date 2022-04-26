import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Card = function ({
  title, subtitle, themes, rating,
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
  return (
    <div className="carouselElement">
      <div className="carouselContent">
        <p className="title">{title}</p>
        {subtitle
        && <p className="subtitle">{subtitle}</p>}
        {themes
        && (
        <ul className="theme">
          {themes.map((theme) => (
            <li key={theme.id}><a href="#">{theme.name}</a></li>
          ))}
        </ul>
        )}
        {rating
        && <p className="rating">{stars}</p>}
      </div>
    </div>
  );
};

Card.defaultProps = {
  subtitle: null,
  themes: null,
  rating: null,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  themes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  rating: PropTypes.number,
};

export default Card;
