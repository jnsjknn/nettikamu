import React, { useState } from 'react';
import classes from './Login.module.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';
import pathnames from '../../../assets/data/pathnames';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberUser, toggleRememberUser] = useState(false);
  const { username, password } = formData;

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    login(username, password, rememberUser);
  };

  if (isAuthenticated) {
    return <Redirect to={pathnames.VERIFY} />;
  }

  return (
    <Card>
      <div className={classes.Login}>
        <h1>Kirjautuminen</h1>
        <form onSubmit={e => submitHandler(e)}>
          <label htmlFor="username">Käyttäjätunnus</label>
          <Input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            required
            onChange={onChangeHandler}
            value={username}
          />

          <label htmlFor="password">Salasana</label>
          <Input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            onChange={e => onChangeHandler(e)}
            value={password}
          />
          <p>
            <Link to={pathnames.RESET_PASSWORD}>Unohtuiko salasana?</Link>
          </p>
          <div className={classes.RememberUser}>
            <Input
              type="switch"
              onChange={e => toggleRememberUser(e.target.checked)}
            />
            <p>Muista minut 7 päivän ajan</p>
          </div>
          <Button type="submit">Kirjaudu</Button>
        </form>
        <p>
          Eikö sinulla ole tunnuksia?{' '}
          <Link to={pathnames.REGISTER}>Rekisteröidy</Link>
        </p>
      </div>
    </Card>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
