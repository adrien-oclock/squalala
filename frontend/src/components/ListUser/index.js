/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import Card from '../Card';

import './styles.scss';

const ListUser = function () {
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

  const data = [
    {
      id: 1,
      username: 'Yata',
      created_at: '2019-04-08',
      soundboards: 42,
      rating: 4,
    },
    {
      id: 2,
      username: 'Bonjour',
      created_at: '2019-01-08',
      soundboards: 12,
      rating: 1,
    },
    {
      id: 3,
      username: 'Wesh',
      created_at: '2018-01-02',
      soundboards: 5,
      rating: 2,
    },
    {
      id: 4,
      username: 'Adrien',
      created_at: '2022-06-15',
      soundboards: 105,
      rating: 5,
    },
    {
      id: 5,
      username: 'Oclock',
      created_at: '2019-04-08',
      soundboards: 10,
      rating: 3,
    },
    {
      id: 1,
      username: 'Yolo',
      created_at: '2019-04-08',
      soundboards: 42,
      rating: 4,
    },
  ];
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
        {data.map((user) => (
          <Card key={user.id} title={user.username} subtitle={`Nombres de soundboards : ${user.soundboards}`} info={`Créé le : ${user.created_at}`} rating={user.rating} />
        ))}
      </section>
    </div>
  );
};

export default ListUser;
