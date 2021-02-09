import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Index.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';
import socials from '../../../assets/data/socials';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Card from '../../UI/Card/Card';
import Advertisement from '../../UI/Advertisement/Advertisement';
import friendsImg from '../../../assets/images/friends.webp';
import { loadPosts } from '../../../actions/posts';
import PostItem from '../../UI/PostItem/PostItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../UI/Pagination/Pagination';
import locations from '../../../assets/data/locations';
import Spinner from '../../UI/Spinner/Spinner';

const Index = ({
  history,
  isAuthenticated,
  loadPosts,
  posts,
  pages,
  currentPage,
  loading
}) => {
  const [username, updateUsername] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, toggleShowFilters] = useState(false);
  const [query, updateQuery] = useState({
    requiredAccount: '',
    ageMin: 16,
    ageMax: 100,
    region: '',
    male: true,
    female: true,
    city: ''
  });
  const { ageMin, ageMax, requiredAccount, region, city, male, female } = query;

  useEffect(() => {
    loadPosts({ page });
  }, [loadPosts, page]);

  const filterPosts = e => {
    e.preventDefault();
    let gender = '';
    if (male && !female) gender = 'mies';
    if (!male && female) gender = 'nainen';
    setPage(1);
    loadPosts({ page: 1, query: { ...query, gender } });
  };

  const onChangeHandler = e => {
    if (e.target.name === 'region') {
      updateQuery({ ...query, city: '', [e.target.name]: e.target.value });
    } else if (e.target.type === 'checkbox') {
      updateQuery({ ...query, [e.target.name]: e.target.checked });
    } else {
      updateQuery({ ...query, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className={classes.Index}>
      {!isAuthenticated && (
        <div className={classes.CallToAction}>
          <h1>Aloita uusien kaverien etsiminen</h1>
          <form>
            <Input
              type="text"
              value={username}
              onChange={e => updateUsername(e.target.value)}
              placeholder="Valitse kayttäjänimi.."
            />

            <Button
              type="submit"
              onClick={e => {
                e.preventDefault();
                history.push(
                  pathnames.REGISTER_W_USERNAME.replace(':username', username)
                );
              }}
            >
              Rekisteröidy ilmaiseksi
            </Button>
            <p>
              Nettikamussa voit jakaa nimimerkkisi suosittuihin
              viestintäsovelluksiin ja selata muiden ilmoituksia tutustuaksesi
              uusiin ihmisiin. Sivustoa kehitetään aktiivisesti sen käyttäjien
              toiveet huomioiden.
            </p>
          </form>
        </div>
      )}
      <div className={classes.ImageWrapper}>
        <img
          className={classes.Image}
          src={friendsImg}
          alt="Neljä ystävystä seisoo katsomassa auringonlaskua"
        />
      </div>
      <div className={classes.Posts}>
        <h2>Ilmoitukset</h2>
        <Card style={{ marginTop: '0' }}>
          <div className={classes.Filters}>
            <h4 onClick={() => toggleShowFilters(!showFilters)}>
              Hakuehdot{' '}
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ transform: `rotateX(${showFilters ? 180 : 0}deg)` }}
              />
            </h4>
            {showFilters && (
              <>
                <form onSubmit={filterPosts}>
                  <div className={classes.Label}>Ikä</div>
                  <div className={classes.Row}>
                    <Input
                      type="number"
                      name="ageMin"
                      min={16}
                      max={100}
                      value={ageMin}
                      style={{
                        width: '70px',
                        textAlign: 'center',
                        marginRight: '5px'
                      }}
                      onChange={onChangeHandler}
                    />
                    -
                    <Input
                      type="number"
                      name="ageMax"
                      min={16}
                      max={100}
                      value={ageMax}
                      style={{
                        width: '70px',
                        textAlign: 'center',
                        marginLeft: '5px'
                      }}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className={classes.Label}>Sukupuoli</div>
                  <div className={classes.Row}>
                    <label>Mies</label>
                    <Input
                      type="switch"
                      name="male"
                      checked={male}
                      onChange={onChangeHandler}
                    />
                    <label>Nainen</label>
                    <Input
                      type="switch"
                      name="female"
                      checked={female}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className={classes.Label}>Käyttäjällä on</div>
                  <Input
                    type="dropdown"
                    options={socials.map(social => social.name)}
                    name="requiredAccount"
                    selected={requiredAccount}
                    value={requiredAccount}
                    onChange={onChangeHandler}
                  />
                  <div className={classes.Label}>Maakunta</div>
                  <Input
                    type="dropdown"
                    options={Object.keys(locations)}
                    name="region"
                    value={region}
                    selected={region}
                    onChange={onChangeHandler}
                  />

                  <div className={classes.Label}>Kaupunki</div>
                  <Input
                    type="dropdown"
                    options={locations[region]}
                    name="city"
                    selected={city}
                    value={city}
                    onChange={onChangeHandler}
                    disabled={region === ''}
                  />
                  <Button type="submit" style={{ marginTop: '20px' }}>
                    Suodata
                  </Button>
                </form>
              </>
            )}
          </div>
        </Card>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spinner />
          </div>
        )}
        {!loading && !isAuthenticated && (
          <>
            <PostItem
              admin={true}
              text="Tervetuloa nettikamuun. Osa ilmoitusten tiedoista on piilotettu käyttäjiltä, jotka eivät ole kirjautuneet. Tässä näet kuitenkin esimerkin kirjautuneille näkyvästä julkaisusta"
              gender="mies"
              age={25}
              date={new Date()}
              region="Maakunta"
              city="Kaupunki"
              _id="null"
              snapchat="snapTunnus"
              instagram="igtunnus"
              full={true}
            />
            {posts.map(post => (
              <PostItem key={post._id} {...post} />
            ))}
          </>
        )}
        {!loading && posts.length === 0 && (
          <div style={{ textAlign: 'center' }}>
            Hakuehdoilla ei löytynyt ilmoituksia
          </div>
        )}
        {isAuthenticated && (
          <Link to={pathnames.NEW_POST}>
            <div className={classes.AddPost}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </Link>
        )}
        <Advertisement />
        <Pagination
          page={page}
          totalPages={pages > 0 ? pages : 1}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

Index.propTypes = {
  isAuthenticated: PropTypes.bool,
  loadPosts: PropTypes.func,
  loading: PropTypes.bool,
  posts: PropTypes.array,
  currentPage: PropTypes.number,
  pages: PropTypes.number
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.posts.posts,
  pages: state.posts.pages,
  currentPage: state.posts.page,
  loading: state.posts.loading
});

export default connect(mapStateToProps, { loadPosts })(Index);
