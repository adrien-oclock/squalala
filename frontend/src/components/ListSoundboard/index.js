/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import CardSoundboard from '../Card/Soundboard';

import './styles.scss';

const ListSoundboard = function (props) {

  // Only on init
  // useEffect need props to access vars
  useEffect(() => {
    props.loadSoundboards();
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

  console.log(props.soundboards);
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
          <li><input type="checkbox" name="theme[]" value="1" id="theme-1" key="theme-1" defaultChecked /><label htmlFor="theme-1">Tata</label></li>
          <li><input type="checkbox" name="theme[]" value="2" id="theme-2" key="theme-2" /><label htmlFor="theme-2">Titi</label></li>
          <li><input type="checkbox" name="theme[]" value="3" id="theme-3" key="theme-3" /><label htmlFor="theme-3">Toto</label></li>
          <li><input type="checkbox" name="theme[]" value="4" id="theme-4" key="theme-4" /><label htmlFor="theme-4">Tutu</label></li>
          <li><input type="checkbox" name="theme[]" value="5" id="theme-5" key="theme-5" /><label htmlFor="theme-5">Yolo</label></li>
          <li><input type="checkbox" name="theme[]" value="6" id="theme-6" key="theme-6" /><label htmlFor="theme-6">Super thème</label></li>
          <li><input type="checkbox" name="theme[]" value="7" id="theme-7" key="theme-7" /><label htmlFor="theme-7">Youpi</label></li>
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
