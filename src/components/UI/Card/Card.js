import React from 'react';
import classes from './Card.module.css';

const Card = ({ children, ...rest }) => {
  return (
    <div className={classes.Card} {...rest}>
      {children}
    </div>
  );
};

export default Card;
