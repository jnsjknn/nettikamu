import React from 'react';
import classes from './Pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import scrollToTop from '../../../utils/scrollToTop';
const Pagination = ({ page, totalPages, setPage }) => {
  const next = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
    scrollToTop();
  };

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const classList = [];
  if (page === 1) {
    classList.push(classes.RoundLeft);
  }
  if (totalPages === 1 || page === totalPages) {
    classList.push(classes.RoundRight);
  }

  return (
    <div className={classes.Pagination}>
      {page === 1 ? (
        <div className={classes.PreviousDisabled}></div>
      ) : (
        <Button onClick={previous} disabled={page === 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
      )}
      <div className={classList.join(' ')}>
        {page} / {totalPages}
      </div>
      {totalPages === 1 || page === totalPages ? (
        <div className={classes.NextDisabled}></div>
      ) : (
        <Button onClick={next}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
