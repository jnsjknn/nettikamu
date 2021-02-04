import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Spinner}></div>
    </div>
  );
};

export default Spinner;
