import React from 'react';

const SliderArrows = function(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default SliderArrows;
