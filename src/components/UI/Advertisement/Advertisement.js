import React from 'react';
import classes from './Advertisement.module.css';
import AdSense from 'react-adsense';
import Card from '../Card/Card';

const Advertisement = () => {
  return null;
  return (
    <Card style={{ padding: 0, height: '354px' }}>
      <p className={classes.AdNotice}>------ Mainos ------</p>
      <AdSense.Google
        client="ca-pub-8064636821608705"
        slot="7607366394"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
      />
    </Card>
  );
};

export default Advertisement;
