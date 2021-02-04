import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';
import { sendVerification, resetPassword } from '../../../actions/auth';
import { Redirect } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';

const ResetPassword = ({
  sendVerification,
  resetPassword,
  passwordChanged
}) => {
  const [smsSent, updateSmsSent] = useState(false);
  const [phoneNumber, updatePhoneNumber] = useState('');
  const [verificationCode, updateVerificationCode] = useState('');
  const [newPassword, updateNewPassword] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (!smsSent) {
      sendVerification(phoneNumber, false);
      updateSmsSent(true);
    } else {
      resetPassword({ phoneNumber, verificationCode, newPassword });
    }
  };
  if (passwordChanged) {
    return <Redirect to={pathnames.LOGIN} />;
  }

  return (
    <Card style={{ marginTop: '75px' }}>
      <form onSubmit={e => submitHandler(e)}>
        {!smsSent && (
          <>
            <label>Puhelinnumero</label>
            <Input
              type="tel"
              name="phoneNumber"
              autoComplete="tel"
              required
              onChange={e => updatePhoneNumber(e.target.value)}
              value={phoneNumber}
            />
            <Button>Lähetä vahvistuskoodi</Button>
          </>
        )}
        {smsSent && (
          <>
            <label>Vahvistuskoodi</label>
            <Input
              type="number"
              name="verificationCode"
              required
              onChange={e => updateVerificationCode(e.target.value)}
              value={verificationCode}
            />
            <label>Uusi salasana</label>
            <Input
              type="password"
              name="newPassword"
              autoComplete="new-password"
              required
              onChange={e => updateNewPassword(e.target.value)}
              value={newPassword}
            />
            <Button>Vaihda salasana</Button>
          </>
        )}
      </form>
    </Card>
  );
};

ResetPassword.propTypes = {
  sendVerification: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  passwordChanged: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  passwordChanged: state.auth.passwordChanged
});

export default connect(mapStateToProps, {
  sendVerification,
  resetPassword
})(ResetPassword);
