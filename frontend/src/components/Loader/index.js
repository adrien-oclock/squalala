import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

const Loader = () => {

  const view = () => (
    <div className="loading-overlay">
      <div className="clock-loader"></div>
    </div>
  );

  const container = document.getElementById('root');
  return ReactDOM.createPortal(view(), container);
};

export default Loader;
