/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import CardSoundboard from '../Card/Soundboard';

import './styles.scss';

const ListSoundboard = function (props) {

  // Only on init
  // useEffect need props to access vars
  useEffect(() => {
    props.loadSoundboards();
    props.loadTags();
  }, []);

  const [activatedDateSort, setActivatedDateSort] = useState('primary');
  const [activatedLikeSort, setActivatedLikeSort] = useState('secondary');
  const [dateSort, setDateSort] = useState('up');
  const [likeSort, setLikeSort] = useState('down');

  const sortButtonHandler = (e) => {
    const clickedSort = e.target.dataset.sort;

    // Change sort order date
    if (clickedSort === 'date' && activatedDateSort === 'primary') {
      if (dateSort === 'up') {
        setDateSort('down');
      }
      else {
        setDateSort('up');
      }
    }
    else if (clickedSort === 'date' && activatedDateSort === 'secondary') {
      setActivatedDateSort('primary');
      setActivatedLikeSort('secondary');
    }

    // Change sort order like
    if (clickedSort === 'like' && activatedLikeSort === 'primary') {
      if (likeSort === 'up') {
        setLikeSort('down');
      }
      else {
        setLikeSort('up');
      }
    }
    else if (clickedSort === 'like' && activatedLikeSort === 'secondary') {
      setActivatedDateSort('secondary');
      setActivatedLikeSort('primary');
    }
  };

  if (props.loading) {
    return 'Chargement';
  }

  return (
    <div className="listContainer">
      <form id="filter" className="ghost">
        <div id="search-input">
          <label htmlFor="search">Rechercher</label>
          <input id="search" type="search" placeholder="Rechercher..." />
          <button type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true" />
          </button>
        </div>
        <ul id="checkboxes">
          {props.tags.map((tag) => (
            <li key={`theme-${tag.id}`}>
              <input type="checkbox" name="theme[]" value={tag.id} id={`theme-${tag.id}`} />
              <label htmlFor={`theme-${tag.id}`}>{tag.title}</label>
            </li>
          ))}
        </ul>
        <div id="sorting">
          <button type="button" className={`btn btn-${activatedDateSort}`} onClick={sortButtonHandler} data-sort="date">
            Date
            <i className={`fa fa-arrow-${dateSort}`} />
          </button>
          <button type="button" className={`btn btn-${activatedLikeSort}`} onClick={sortButtonHandler} data-sort="like">
            Like
            <i className={`fa fa-arrow-${likeSort}`} />
          </button>
        </div>
      </form>
      <section id="list">
        {props.soundboards.map((soundboard) => (
          <CardSoundboard key={soundboard.id} title={soundboard.title} subtitle={soundboard.user.username} info={`Nombres de sons : ${soundboard.sounds.length}`} themes={soundboard.tags} rating={soundboard.rating} text={soundboard.description} />
        ))}
      </section>
    </div>
  );
};

export default ListSoundboard;
