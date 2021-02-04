import React, { useState } from 'react';
import classes from './Verify.module.css';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendVerification, confirmVerification } from '../../../actions/auth';
import pathnames from '../../../assets/data/pathnames';

const Verify = ({
  isAuthenticated,
  role,
  sendVerification,
  confirmVerification,
  phoneNumberAccepted
}) => {
  const [phoneNumber, updatePhoneNumber] = useState('');
  const [verificationCode, updateVerificationCode] = useState('');

  if (!isAuthenticated) {
    return <Redirect to={pathnames.LOGIN} />;
  }

  if (role >= 1) {
    return <Redirect to={pathnames.PROFILE} />;
  }

  const submitHandler = e => {
    e.preventDefault();
    if (!phoneNumberAccepted) {
      sendVerification(phoneNumber);
    } else {
      confirmVerification({ phoneNumber, verificationCode });
    }
  };

  return (
    <Card style={{ marginTop: '65px' }}>
      <form className={classes.Verify} onSubmit={submitHandler}>
        <h3>Puhelinnumeron vahvistus</h3>
        {!phoneNumberAccepted && (
          <>
            <label>Puhelinnumero</label>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="+358501234567"
              autoComplete="tel"
              required
              onChange={e => updatePhoneNumber(e.target.value)}
              value={phoneNumber}
            />
            <p>
              Puhelinnumerovahvistus auttaa meitä estämään nettikamun käytön
              boteilta ja epäasiallisilta käyttäjiltä. Numeroasi ei jaeta
              eteenpäin.
            </p>
            <Button>Lähetä vahvistuskoodi</Button>
          </>
        )}
        {phoneNumberAccepted && (
          <>
            <label>Vahvistuskoodi</label>
            <Input
              type="number"
              name="verificationCode"
              required
              onChange={e => updateVerificationCode(e.target.value)}
              value={verificationCode}
            />
            <Button>Lähetä vahvistuskoodi</Button>
          </>
        )}
      </form>
    </Card>
  );
};

Verify.propTypes = {
  isAuthenticated: PropTypes.bool,
  role: PropTypes.number,
  sendVerification: PropTypes.func.isRequired,
  confirmVerification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  phoneNumberAccepted: state.auth.phoneNumberAccepted
});

export default connect(mapStateToProps, {
  sendVerification,
  confirmVerification
})(Verify);
