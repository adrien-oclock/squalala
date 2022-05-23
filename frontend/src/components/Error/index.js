import React from 'react';

import './styles.scss';
import gif from './squalala.gif';

const Error = () => (
  <section id="not-found">
    <img src={gif} alt="Squalala" />
    <h2>Squalala</h2>
    <p>Nous sommes partis.</p>
  </section>
);

export default Error;
