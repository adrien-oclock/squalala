/* eslint-disable max-len */
import React from 'react';

import Card from '../Card';

import './styles.scss';

const ListSoundboard = function () {
  const data = [
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
      description: 'Hic nulla dolores et distinctio minus non voluptates voluptate et animi vero.',
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
  return (
    <div className="listContainer">
      <form id="filter">
        <div id="search-input">
          <label htmlFor="search">Rechercher</label>
          <input id="search" type="search" placeholder="Rechercher..." />
          <button type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true" />
          </button>
        </div>
        <ul id="checkboxes">
          <li><input type="checkbox" name="theme[]" value="1" key="theme-1"/><label htmlFor="theme-1">Tata</label></li>
          <li><input type="checkbox" name="theme[]" value="2" key="theme-2"/><label htmlFor="theme-2">Titi</label></li>
          <li><input type="checkbox" name="theme[]" value="3" key="theme-3"/><label htmlFor="theme-3">Toto</label></li>
          <li><input type="checkbox" name="theme[]" value="4" key="theme-4"/><label htmlFor="theme-4">Tutu</label></li>
          <li><input type="checkbox" name="theme[]" value="5" key="theme-5"/><label htmlFor="theme-5">Yolo</label></li>
          <li><input type="checkbox" name="theme[]" value="6" key="theme-6"/><label htmlFor="theme-6">Super thème</label></li>
          <li><input type="checkbox" name="theme[]" value="7" key="theme-7"/><label htmlFor="theme-7">Youpi</label></li>
        </ul>
      </form>
      <section id="list">
        {data.map((soundboard) => (
          <Card key={soundboard.id} title={soundboard.title} subtitle={soundboard.author} themes={soundboard.themes} rating={soundboard.rating} />
        ))}
      </section>
    </div>
  );
};

export default ListSoundboard;
