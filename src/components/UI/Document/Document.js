import React, { useEffect } from 'react';
import classes from './Document.module.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import scrollToTop from '../../../utils/scrollToTop';

const PrivacyPolicy = ({ history, children }) => {
  useEffect(() => {
    scrollToTop();
  });
  return (
    <Card style={{ marginTop: '65px' }}>
      <Button onClick={() => history.goBack()}>
        Takaisin edelliselle sivulle
      </Button>
      <div className={classes.Document}>{children}</div>
      <Button onClick={() => history.goBack()}>
        Takaisin edelliselle sivulle
      </Button>
    </Card>
  );
};

export default PrivacyPolicy;
