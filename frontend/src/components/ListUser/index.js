/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import CardSoundboard from '../Card/Soundboard';
import { formatDate } from 'src/utils';

import './styles.scss';

const ListUser = function (props) {

  const [activatedDateSort, setActivatedDateSort] = useState('primary');
  const [activatedLikeSort, setActivatedLikeSort] = useState('secondary');
  const [dateSort, setDateSort] = useState('down');
  const [likeSort, setLikeSort] = useState('down');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    props.loadUsers(search, sortBy, order);
  }, [search, sortBy, order]);

  const sortUsers = (e) => {
    const clickedSort = e.target.dataset.sort;
    // Change sort order date
    if (clickedSort === 'date' && activatedDateSort === 'primary') {
      setSortBy('date');
      if (dateSort === 'up') {
        setDateSort('down');
        setOrder('desc');
      }
      else {
        setDateSort('up');
        setOrder('asc');
      }
    }
    else if (clickedSort === 'date' && activatedDateSort === 'secondary') {
      setActivatedDateSort('primary');
      setActivatedLikeSort('secondary');
      setSortBy('date');
    }

    // Change sort order like
    if (clickedSort === 'like' && activatedLikeSort === 'primary') {
      setSortBy('like');
      if (likeSort === 'up') {
        setLikeSort('down');
        setOrder('desc');
      }
      else {
        setLikeSort('up');
        setOrder('asc');
      }
    }
    else if (clickedSort === 'like' && activatedLikeSort === 'secondary') {
      setActivatedDateSort('secondary');
      setActivatedLikeSort('primary');
      setSortBy('like');
    }
  }

  const submitSearchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  if (props.loading) {
    return 'Chargement';
  }

  return (
    <div className="listContainer">
      <form id="filter" className="ghost" onSubmit={submitSearchHandler}>
        <div id="search-input">
          <label htmlFor="search">Rechercher</label>
          <input id="search" type="search" name="search" placeholder="Rechercher..." defaultValue={search} />
          <button type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true" />
          </button>
        </div>
        <div id="sorting">
          <button type="button" className={`btn btn-${activatedDateSort}`} onClick={sortUsers} data-sort="date">
            Date
            <i className={`fa fa-arrow-${dateSort}`} />
          </button>
          <button type="button" className={`btn btn-${activatedLikeSort}`} onClick={sortUsers} data-sort="like">
            Like
            <i className={`fa fa-arrow-${likeSort}`} />
          </button>
        </div>
      </form>
      <section id="list">
        {props.users.map((user) => (
          <CardSoundboard key={user.id} title={user.username} subtitle={`Nombre de soundboards : ${user.soundboard.length}`} info={`Créé le : ${formatDate(user.createdAt)}`} rating={user.rating} />
        ))}
      </section>
    </div>
  );
};

export default ListUser;
