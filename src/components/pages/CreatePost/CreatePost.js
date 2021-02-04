import React, { useState } from 'react';
import classes from './CreatePost.module.css';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { createPost, setPostedToFalse } from '../../../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pathnames from '../../../assets/data/pathnames';

const CreatePost = ({ createPost, posted, setPostedToFalse }) => {
  const [rulesOpen, toggleRulesOpen] = useState(false);
  const [rulesAccepted, toggleRulesAccepted] = useState(false);
  const [postText, updatePostText] = useState('');

  const createPostHandler = e => {
    e.preventDefault();
    createPost(postText);
  };

  if (posted) {
    setPostedToFalse();
    return <Redirect to={pathnames.PROFILE} />;
  }

  return (
    <Card style={{ marginTop: '65px' }}>
      <h3 style={{ marginLeft: '5px' }}>Uusi ilmoitus</h3>
      <form className={classes.CreatePost} onSubmit={createPostHandler}>
        <p>
          Kirjoita ilmoituksen teksti. Käyttäjätunnukset lisätään ilmoitukseen
          automaattisesti profiilistasi.
        </p>
        <Input
          type="textarea"
          rows="5"
          cols="50"
          style={{ height: '250px' }}
          placeholder="Kerro jotain itsestäsi"
          value={postText}
          onChange={e => updatePostText(e.target.value)}
        />
        <div className={classes.Terms}>
          <h4 onClick={() => toggleRulesOpen(!rulesOpen)}>
            Säännöt{' '}
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ transform: `rotateX(${rulesOpen ? 180 : 0}deg)` }}
            />
          </h4>
          {rulesOpen && (
            <>
              <p>
                1. Käyttäjätunnusten ja muiden henkilökohtaisten tietojen
                jakaminen ilmoituksen tekstissä on kielletty. Käyttäjätunnukset
                lisätään ilmoitukseen automaattisesti profiilistasi.
              </p>
              <p>
                2. Hyvien tapojen vastainen sisältö (esim. mainokset ja tuhman
                seuran haku) on kielletty
              </p>
              <p>3. Suomen lakien rikkominen on ehdottomasti kielletty</p>
              <p>
                Sääntöjen 1 ja 2 rikkominen johtaa ylläpidon harkinnan
                mukaisesti ilmoituksen poistoon, varoitukseen, tai käyttäjätilin
                estämiseen.
              </p>
              <p>
                Säännön 3 rikkominen johtaa välittömään käyttäjätilin estämiseen
                ja rikosilmoitukseen
              </p>
            </>
          )}
        </div>
        <div className={classes.AcceptTerms}>
          <Input
            type="switch"
            label="Olen lukenut ja ymmärtänyt säännöt"
            onChange={e => toggleRulesAccepted(e.target.checked)}
          />
          <p>Olen lukenut ja ymmärtänyt ilmoitusten jakamisen säännöt</p>
        </div>
        <Button type="submit" disabled={rulesAccepted ? false : true}>
          Julkaise
        </Button>
      </form>
    </Card>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  setPostedToFalse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posted: state.posts.posted
});

export default connect(mapStateToProps, { createPost, setPostedToFalse })(
  CreatePost
);
