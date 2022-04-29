/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import CardSound from '../Card/Sound';

import './styles.scss';

const Soundboard = function () {
  const soundboards = [
    {
      id: 1,
      title: 'Yata',
      author: 'Adrien',
      description: 'Hic nulla dolores et distinctio minus non voluptates voluptate et animi vero.',
      sounds: 42,
      themes: [
        {
          id: 1,
          name: 'tata',
        },
        {
          id: 2,
          name: 'tutu',
        },
      ],
      rating: 4,
    },
    {
      id: 2,
      title: 'Boom',
      author: 'Venga',
      sounds: 12,
      themes: [
        {
          id: 1,
          name: 'titi',
        },
        {
          id: 2,
          name: 'tutu',
        },
      ],
      rating: 2,
    },
    {
      id: 3,
      title: 'Yop',
      author: 'TF1',
      description: 'Hic nulla dolores et distinctio minus non voluptates voluptate et animi vero.',
      sounds: 42,
      rating: 3,
    },
    {
      id: 4,
      title: 'Boson',
      author: 'Higgs',
      description: 'Hic nulla dolores et distinctio minus non voluptates voluptate et animi vero.',
      sounds: 52,
      themes: [
        {
          id: 1,
          name: 'bim',
        },
        {
          id: 2,
          name: 'paf',
        },
      ],
      rating: 4,
    },
    {
      id: 5,
      title: 'Yolo',
      author: 'Torink',
      description: 'Hic nulla dolores et distinctio minus non voluptates voluptate et animi vero.',
      sounds: 1,
      themes: [
        {
          id: 1,
          name: 'tata',
        },
      ],
      rating: 5,
    },
    {
      id: 6,
      title: 'Test',
      author: 'John',
      description: 'Hic nulla dolores et distinctio minus non voluptates voluptate et animi vero.',
      sounds: 10,
      themes: [
        {
          id: 1,
          name: 'tata',
        },
        {
          id: 2,
          name: 'tutu',
        },
      ],
      rating: 1,
    },
  ];

  const data = {
    id: 1,
    title: 'Super génial',
    author: 'Adrien',
    rating: 4,
    created_at: '2019-04-08',
    sounds: [
      {
        id: 1,
        title: 'Bim',
        text: 'Je suis la petite description hihi',
      },
      {
        id: 2,
        title: 'Boom',
        text: 'Je suis la super grande description hehe',
      },
      {
        id: 3,
        title: 'Zap',
        text: 'Je suis la petite description hihi',
      },
      {
        id: 4,
        title: 'Wizz',
        text: 'Je suis la petite description hihi',
      },
      {
        id: 5,
        title: 'Chebam',
        text: 'Je suis la petite description hihi',
      },
      {
        id: 6,
        title: 'Wololo',
        text: 'Je suis la petite description hihi',
      },
    ],
  };
  return (
    <div className="profile">
      <section id="author">
        <h4>{data.author}</h4>
        <nav>
          <ul>
            {soundboards.map((soundboard) => (
              <li key={soundboard.id} className={`btn ${soundboard.id === data.id ? 'btn-primary' : 'btn-secondary'}`}><a href="#">{soundboard.title}</a></li>
            ))}
          </ul>
        </nav>
      </section>
      <section id="soundboard">
        {data.sounds.map((sound) => (
          <CardSound key={sound.id} title={sound.title} text={sound.text} />
        ))}
        <CardSound key="sound-rate" rating={data.rating} />
        <CardSound key="sound-add" add />
      </section>
    </div>
  );
};

export default Soundboard;
