import React from 'react';
import classes from './Input.module.css';

const Input = ({ type, onChange, onoff = true, options, ...rest }) => {
  switch (type) {
    case 'textarea':
      return (
        <textarea className={classes.Input} {...rest} onChange={onChange} />
      );
    case 'switch':
      const classList = [classes.Slider];
      if (onoff) {
        classList.push(classes.OnOff);
      }
      return (
        <label className={classes.Switch}>
          <input type="checkbox" onChange={onChange} {...rest} />
          <span className={classList.join(' ')}></span>
        </label>
      );
    case 'dropdown':
      return (
        <select className={classes.Input} onChange={onChange} {...rest}>
          <option value=""></option>
          {options &&
            options
              .sort()
              .map(option => (
                <option key={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
        </select>
      );
    default:
      return (
        <input
          type={type}
          className={classes.Input}
          onChange={onChange}
          {...rest}
        />
      );
  }
};

export default Input;
