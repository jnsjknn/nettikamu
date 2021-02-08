import React, { useState, useEffect } from 'react';
import classes from './Register.module.css';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../actions/auth';

const Register = ({ match, isAuthenticated, register, history }) => {
  const [formData, updateFormData] = useState({
    username: match.params.username ?? '',
    password: '',
    dateOfBirth: '',
    gender: '',
    accepted: false
  });
  const [showPassword, toggleShowPassword] = useState(false);

  useEffect(() => {
    const data = localStorage.formData;
    if (data) {
      updateFormData(oldData => ({ ...oldData, ...JSON.parse(data) }));
      localStorage.removeItem('formData');
    }
  }, []);

  const { username, password, dateOfBirth, gender, accepted } = formData;

  if (isAuthenticated) {
    return <Redirect to={pathnames.VERIFY} />;
  }

  const submitHandler = e => {
    e.preventDefault();
    localStorage.removeItem('formData');
    register({ username, password, dateOfBirth, gender });
  };

  return (
    <Card>
      <form className={classes.Register} onSubmit={submitHandler}>
        <h1>Rekisteröityminen</h1>
        <label htmlFor="username">Käyttäjätunnus</label>
        <Input
          id="username"
          value={username}
          name="username"
          placeholder="5-25 merkkiä"
          autoComplete="username"
          onChange={e =>
            updateFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="password">Salasana</label>
        <span className={classes.PasswordWrapper}>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            name="password"
            placeholder="Väh 6 merkkiä"
            onChange={e =>
              updateFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <span
            className={classes.ShowPassword}
            onClick={() => toggleShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </span>
        <label htmlFor="dateOfBirth">Syntymäaika</label>
        <Input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          name="dateOfBirth"
          onChange={e =>
            updateFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="gender">Sukupuoli</label>
        <div className={classes.Gender}>
          <span>mies</span>{' '}
          <Input
            type="switch"
            name="gender"
            checked={gender === 'mies' ? true : false}
            onChange={e =>
              updateFormData({
                ...formData,
                gender: e.target.checked ? 'mies' : 'nainen'
              })
            }
          />{' '}
          <span>nainen</span>{' '}
          <Input
            type="switch"
            name="gender"
            checked={gender === 'nainen' ? true : false}
            onChange={e =>
              updateFormData({
                ...formData,
                gender: e.target.checked ? 'nainen' : 'mies'
              })
            }
          />{' '}
        </div>
        <div className={classes.Privacy}>
          <span>
            Olen lukenut Nettikamun{' '}
            <div
              onClick={() => {
                const data = { username, dateOfBirth, gender };
                localStorage.setItem('formData', JSON.stringify(data));
                history.push(pathnames.PRIVACY_POLICY);
              }}
            >
              tietosuojaselosteen
            </div>{' '}
            ja annan suostumukseni tietojeni käsittelyyn siinä kuvatulla tavalla
          </span>
          <Input
            type="switch"
            name="accepted"
            checked={accepted}
            onChange={e =>
              updateFormData({
                ...formData,
                accepted: e.target.checked
              })
            }
          />
        </div>
        <Button
          disabled={
            username.length < 5 ||
            password.length < 6 ||
            dateOfBirth === '' ||
            gender === '' ||
            !accepted
          }
        >
          Rekisteröidy
        </Button>
      </form>
    </Card>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
