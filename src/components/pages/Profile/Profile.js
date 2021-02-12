import React, { useState, useEffect } from 'react';
import classes from './Profile.module.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Prompt from '../../UI/Prompt/Prompt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';
import pathnames from '../../../assets/data/pathnames';
import socials from '../../../assets/data/socials';
import Advertisement from '../../UI/Advertisement/Advertisement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faList,
  faUsers,
  faUserShield,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import {
  updateSocials,
  updateUsername,
  updatePassword,
  loadUser,
  deleteUser,
  updateLocation
} from '../../../actions/auth';
import { setAlert } from '../../../actions/alert';
import { deletePost } from '../../../actions/posts';
import dateToTimeAgo from '../../../utils/dateToTimeAgo';
import locations from '../../../assets/data/locations.js';

const Profile = ({
  user,
  isAuthenticated,
  loading,
  role,
  updateSocials,
  updateUsername,
  updatePassword,
  setAlert,
  loadUser,
  deletePost,
  deleteUser,
  updateLocation
}) => {
  const [userProfile, updateUserProfile] = useState({
    username: '',
    newPassword: '',
    currentPassword: '',
    posts: [],
    discord: '',
    facebook: '',
    instagram: '',
    kik: '',
    skype: '',
    snapchat: '',
    telegram: '',
    whatsapp: '',
    region: '',
    city: ''
  });

  const [disabledButtons, updateDisabledButtons] = useState({
    username: true,
    password: true,
    socials: true
  });

  const [selection, setSelection] = useState('profile');
  const [showPrompt, toggleShowPrompt] = useState(false);

  useEffect(() => {
    if (user) {
      const socials = user.socials;
      updateUserProfile(userProfile => {
        return { ...userProfile, ...user, ...socials };
      });
    }
  }, [user]);

  const onChangeHandler = e => {
    if (['currentPassword', 'newPassword'].includes(e.target.name)) {
      if (currentPassword.length > 5 && newPassword.length > 5) {
        updateDisabledButtons({ ...disabledButtons, password: false });
      } else {
        updateDisabledButtons({ ...disabledButtons, password: true });
      }
    }
    if (e.target.name === 'username') {
      if (username.length > 4) {
        updateDisabledButtons({ ...disabledButtons, username: false });
        return;
      } else {
        updateDisabledButtons({ ...disabledButtons, username: true });
      }
      if (e.target.value.length > 25) {
        updateUserProfile({
          ...userProfile,
          [e.target.name]: e.target.value.substring(0, 25)
        });
        return;
      }
    }

    updateDisabledButtons({
      ...disabledButtons,
      socials: false
    });

    if (e.target.name === 'region') {
      updateUserProfile({
        ...userProfile,
        city: '',
        [e.target.name]: e.target.value
      });
      return;
    }
    updateUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const {
    username,
    currentPassword,
    newPassword,
    posts,
    discord,
    facebook,
    instagram,
    kik,
    skype,
    snapchat,
    telegram,
    whatsapp,
    region,
    city
  } = userProfile;
  const updateSocialsHandler = e => {
    e.preventDefault();
    updateSocials({
      discord,
      facebook,
      instagram,
      kik,
      skype,
      snapchat,
      telegram,
      whatsapp
    });
  };

  const updateLocationHandler = e => {
    e.preventDefault();
    updateLocation({ region, city });
  };
  const updateUsernameHandler = e => {
    e.preventDefault();
    if (username.length < 5 || username.length > 25) {
      setAlert({
        msg: 'Anna 5-25 -merkkinen käyttäjätunnus',
        type: 'Error'
      });
      return;
    }
    updateUsername(username);
  };
  const updatePasswordHandler = e => {
    e.preventDefault();
    if (newPassword.length < 6 || currentPassword.length < 6) {
      setAlert({
        msg: 'Anna nykyinen salasana ja vähintään 6-merkkinen uusi salasana',
        type: 'Error'
      });
      return;
    }
    updateUserProfile({ ...userProfile, newPassword: '', currentPassword: '' });
    updatePassword(currentPassword, newPassword);
  };

  const deleteUserHandler = password => {
    deleteUser();
  };

  if (role === 0) {
    return <Redirect to={pathnames.VERIFY} />;
  }

  return (
    <div className={classes.Profile}>
      {showPrompt && (
        <Prompt
          text="Anna käyttäjätunnuksesi vahvistaaksesi tilin poiston"
          confirmFunc={deleteUserHandler}
          cancelFunc={() => toggleShowPrompt(false)}
          confirmText="Poista tunnus pysyvästi"
          correctAnswer={user.username}
        />
      )}
      <Card>
        <h1 className={classes.Username}>Profiilin {user.username} muokkaus</h1>
        <div className={classes.Selection}>
          <div
            onClick={() => setSelection('profile')}
            style={{
              border:
                selection === 'profile'
                  ? '1px solid var(--purple)'
                  : '1px solid var(--background-color)'
            }}
          >
            <FontAwesomeIcon icon={faUsers} />
            <div>Profiili</div>
          </div>
          <div
            onClick={() => setSelection('account')}
            style={{
              border:
                selection === 'account'
                  ? '1px solid var(--purple)'
                  : '1px solid var(--background-color)'
            }}
          >
            <FontAwesomeIcon icon={faUserShield} />
            <div>Tilin tiedot</div>
          </div>
          <div
            onClick={() => setSelection('posts')}
            style={{
              border:
                selection === 'posts'
                  ? '1px solid var(--purple)'
                  : '1px solid var(--background-color)'
            }}
          >
            <FontAwesomeIcon icon={faList} />
            <div>Omat ilmoitukset</div>
          </div>
        </div>
      </Card>
      {selection === 'profile' && (
        <Card style={{ minHeight: '100px' }}>
          <h2>Profiili</h2>
          <form onSubmit={updateLocationHandler}>
            <label htmlFor={region}>Maakunta</label>
            <Input
              type="dropdown"
              options={Object.keys(locations)}
              id={region}
              name="region"
              value={region}
              onChange={onChangeHandler}
            />
            <label htmlFor={region}>Kaupunki</label>
            <Input
              type="dropdown"
              options={locations[region]}
              id={city}
              name="city"
              value={city}
              onChange={onChangeHandler}
              disabled={region === ''}
            />
            <Button type="submit">Päivitä sijainti</Button>
          </form>

          <form onSubmit={updateSocialsHandler}>
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <Spinner />
              </div>
            )}

            {!loading && user && (
              <>
                {socials.map(social => {
                  const { name, placeholder } = social;
                  return (
                    <React.Fragment key={name}>
                      <label htmlFor={name}>{name}</label>
                      <Input
                        id={name}
                        name={name}
                        value={userProfile[name]}
                        placeholder={placeholder}
                        onChange={onChangeHandler}
                      />
                    </React.Fragment>
                  );
                })}
                <Button type="submit" disabled={disabledButtons.socials}>
                  Päivitä käyttäjänimet
                </Button>
              </>
            )}
          </form>
        </Card>
      )}
      {selection === 'account' && (
        <Card style={{ minHeight: '100px' }}>
          <h2>Tilin tiedot</h2>
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spinner />
            </div>
          )}
          {!loading && user && (
            <>
              <form onSubmit={updateUsernameHandler}>
                <label>Nettikamutunnus</label>
                <Input
                  type="username"
                  name="username"
                  placeholder="esimerkki1234"
                  value={username}
                  onChange={onChangeHandler}
                />
                <Button type="submit" disabled={disabledButtons.username}>
                  Päivitä nettikamutunnus
                </Button>
              </form>
              <form onSubmit={updatePasswordHandler}>
                <label>Nykyinen salasana</label>
                <Input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={onChangeHandler}
                />
                <label>Uusi salasana</label>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="min 6 merkkiä"
                  value={newPassword}
                  onChange={onChangeHandler}
                />
                <Button type="submit" disabled={disabledButtons.password}>
                  Päivitä salasana
                </Button>
              </form>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  toggleShowPrompt(true);
                }}
              >
                <Button type="submit" style={{ background: 'var(--error)' }}>
                  Poista käyttäjätunnus
                </Button>
              </form>
            </>
          )}
        </Card>
      )}
      {selection === 'posts' && (
        <Card
          style={{
            minHeight: '100px',
            marginBottom: Math.max(10, 150 - posts.length * 30) + 'px'
          }}
        >
          <h2>Omat ilmoitukset</h2>
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spinner />
            </div>
          )}
          {!loading && user && (
            <form className={classes.Posts}>
              {posts
                .sort((a, b) => (a.date > b.date ? -1 : 1))
                .map(post => {
                  return (
                    <div className={classes.Post} key={post._id}>
                      <div className={classes.Text}>
                        <span>
                          {post.text.slice(0, 25)}
                          {post.text.length > 25 && <>..</>}
                        </span>
                        <span>{dateToTimeAgo(post.date)}</span>
                      </div>
                      <div className={classes.ActionButtons}>
                        <Link to={pathnames.POST.replace(':postId', post._id)}>
                          <div className={classes.Open}>
                            <FontAwesomeIcon icon={faEye} />
                          </div>
                        </Link>
                        <div
                          className={classes.Delete}
                          onClick={() => deletePost(post._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              {posts.length === 0 && <div>Et ole jakanut ilmoituksia</div>}
            </form>
          )}
        </Card>
      )}
      <Advertisement />
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  role: PropTypes.number,
  updateSocials: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  loading: state.auth.loading
});

export default connect(mapStateToProps, {
  updateSocials,
  updateUsername,
  updatePassword,
  setAlert,
  loadUser,
  deletePost,
  deleteUser,
  updateLocation
})(Profile);
