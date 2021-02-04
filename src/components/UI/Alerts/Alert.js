import React, { useState, useMemo, useEffect } from 'react';
import classes from './Alert.module.css';
import PropTypes from 'prop-types';

const Alert = ({ type, title, msg, timeout }) => {
  const baseClasses = useMemo(() => [classes.Alert, classes[type]], [type]);
  const [classList, setClassList] = useState([...baseClasses, classes.Enter]);

  useEffect(() => {
    setTimeout(() => {
      setClassList(classList => [...classList, classes.Active]);
    }, 100);

    setTimeout(() => {
      setClassList(() => [...baseClasses, classes.Leave]);
    }, timeout - 400);
  }, [timeout, baseClasses]);

  return (
    <div className={classList.join(' ')}>
      {title && <div className={classes.Title}></div>}
      <p>{msg}</p>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  msg: PropTypes.string.isRequired,
  timeout: PropTypes.number
};

export default Alert;
