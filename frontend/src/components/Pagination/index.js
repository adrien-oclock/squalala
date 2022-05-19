import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Pagination = function ({
  pageCount,
  pagesInRange,
  first,
  last,
  previous,
  next,
  current,
  handleChangePage
}) {
  
  const firstElement = () => {
    if (first && current != first) {
      return (
        <li className="first page-item">
          <a className="page-link" href="#" onClick={() => handleChangePage(first)}>&#60;&#60;</a>
        </li>
      )
    }
  }

  const previousElement = () => {
    if (previous) {
      return (
        <li className="previous page-item">
          <a rel="prev" className="page-link" onClick={() => handleChangePage(current - 1)} href="#">&#60;</a>
        </li>
      )
    }
  }

  const pages = () => {
    let pages = [];
    for (const page of pagesInRange) {
      if (page != current) {
        pages.push(<li className="page-item" key={page}><a className="page-link" href="#" onClick={() => handleChangePage(page)}>{page}</a></li>)
      } else {
        pages.push(<li className="page-item active" key={page}><span className="page-link">{page}</span></li>)
      }
    }

    return pages;
  }

  const nextElement = () => {
    if (next) {
      return (
        <li className="next page-item">
          <a rel="next" className="page-link" href="#" onClick={() => handleChangePage(current + 1)}>&#62;</a>
        </li>
      )
    }
  }

  const lastElement = () => {
    if (last && current != last) {
      return (
        <li className="first page-item">
          <a className="page-link" href="#" onClick={() => handleChangePage(last)}>&#62;&#62;</a>
        </li>
      )
    }
  }

  if (pageCount > 0) {
    return (
      <nav aria-label="Pagination" id="pagination-nav">
        <ul className="pagination">
          {firstElement()}
          {previousElement()}
          {pages()}
          {nextElement()}
          {lastElement()}
        </ul>
      </nav>
    );
  }
};

Pagination.defaultProps = {
  pageCount: 0,
  pagesInRange: [],
  first: null,
  last: null,
  previous: null,
  next: null,
  current: null,
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  pagesInRange: PropTypes.array,
  first: PropTypes.number,
  last: PropTypes.number,
  previous: PropTypes.number,
  next: PropTypes.number,
  current: PropTypes.number,
  handleChangePage: PropTypes.func,
};

export default Pagination;
