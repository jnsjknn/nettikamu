import React, { useState } from 'react';
import classes from './Prompt.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

const Prompt = ({
  text,
  confirmFunc,
  cancelFunc,
  confirmText,
  correctAnswer
}) => {
  const [value, updateValue] = useState('');
  return (
    <div className={classes.Prompt}>
      <div className={classes.Content}>
        <div>{text}</div>
        <Input value={value} onChange={e => updateValue(e.target.value)} />
        <Button onClick={cancelFunc}>Peruuta</Button>
        <Button
          disabled={value !== correctAnswer}
          onClick={() => confirmFunc(value)}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default Prompt;
