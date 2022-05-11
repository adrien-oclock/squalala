/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import CardSoundboard from '../Card/Soundboard';

import './styles.scss';

const ListUser = function (props) {

  // Only on init
  // useEffect need props to access vars
  useEffect(() => {
    props.loadUsers('date', 'desc');
  }, []);

  const [activatedDateSort, setActivatedDateSort] = useState('primary');
  const [activatedLikeSort, setActivatedLikeSort] = useState('secondary');
  const [dateSort, setDateSort] = useState('down');
  const [likeSort, setLikeSort] = useState('down');

  const sortButtonHandler = (e) => {
    const clickedSort = e.target.dataset.sort;

    // Change sort order date
    if (clickedSort === 'date' && activatedDateSort === 'primary') {
      if (dateSort === 'up') {
        setDateSort('down');
        props.loadUsers('date', 'desc');
      }
      else {
        setDateSort('up');
        props.loadUsers('date', 'asc');
      }
    }
    else if (clickedSort === 'date' && activatedDateSort === 'secondary') {
      setActivatedDateSort('primary');
      setActivatedLikeSort('secondary');
      props.loadUsers('date', 'desc');
    }

    // Change sort order like
    if (clickedSort === 'like' && activatedLikeSort === 'primary') {
      if (likeSort === 'up') {
        setLikeSort('down');
        props.loadUsers('like', 'desc');
      }
      else {
        setLikeSort('up');
        props.loadUsers('like', 'asc');
      }
    }
    else if (clickedSort === 'like' && activatedLikeSort === 'secondary') {
      setActivatedDateSort('secondary');
      setActivatedLikeSort('primary');
      props.loadUsers('like', 'desc');
    }
  };

  if (props.loading) {
    return 'Chargement';
  }

  console.log(props.users);
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
        {props.users.map((user) => (
          <CardSoundboard key={user.id} title={user.username} subtitle={`Nombres de soundboards : ${user.soundboards}`} info={`Créé le : ${user.created_at}`} rating={user.rating} />
        ))}
      </section>
    </div>
  );
};

export default ListUser;
