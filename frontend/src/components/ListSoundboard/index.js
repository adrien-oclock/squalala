/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import CardSoundboard from '../Card/Soundboard';

import './styles.scss';

const ListSoundboard = function (props) {

  const [activatedDateSort, setActivatedDateSort] = useState('primary');
  const [activatedLikeSort, setActivatedLikeSort] = useState('secondary');
  const [dateSort, setDateSort] = useState('down');
  const [likeSort, setLikeSort] = useState('down');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [tags, setTags] = useState([]);

  // Only on init
  useEffect(() => {
    props.loadTags();
  }, []);

  useEffect(() => {
    props.loadSoundboards(search, tags, sortBy, order);
  }, [search, tags.length, sortBy, order]);

  const sortSoundboards = (e) => {
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
      if (dateSort === 'up') {
        setOrder('asc');
      }
      else {
        setOrder('desc');
      }
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
      if (likeSort === 'up') {
        setOrder('asc');
      }
      else {
        setOrder('desc');
      }
    }
  }

  const submitSearchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  const tagChangeHandler = (e) => {
    const value = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setTags([...tags, value]);
    }
    else {
      const index = tags.indexOf(value)
      setTags([
        ...tags.slice(0, index),
        ...tags.slice(index + 1, tags.length),
      ])
    }
  }

  const tagCheckedHandler = (value) => {
    return tags.includes(value);
  }

  if (props.loading) {
    return 'Chargement';
  }

  return (
    <div className="listContainer">
      <form id="filter" className="ghost" onSubmit={submitSearchHandler}>
        <div id="search-input">
          <label htmlFor="search">Rechercher</label>
          <input id="search" type="search" placeholder="Rechercher..." name="search" defaultValue={search} />
          <button type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true" />
          </button>
        </div>
        <ul id="checkboxes">
          {props.tags.map((tag) => (
            <li key={`theme-${tag.id}`}>
              <input type="checkbox" name="theme[]" value={tag.id} id={`theme-${tag.id}`} onChange={tagChangeHandler} defaultChecked={tagCheckedHandler(tag.id)} />
              <label htmlFor={`theme-${tag.id}`}>{tag.title}</label>
            </li>
          ))}
        </ul>
        <div id="sorting">
          <button type="button" className={`btn btn-${activatedDateSort}`} onClick={sortSoundboards} data-sort="date">
            Date
            <i className={`fa fa-arrow-${dateSort}`} />
          </button>
          <button type="button" className={`btn btn-${activatedLikeSort}`} onClick={sortSoundboards} data-sort="like">
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
