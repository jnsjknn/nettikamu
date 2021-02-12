import React from 'react';
import classes from './PostItem.module.css';
import { Link } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';
import dateToTimeAgo from '../../../utils/dateToTimeAgo';
import Card from '../Card/Card';
import socials from '../../../assets/data/socials';
import PropTypes from 'prop-types';

const PostItem = ({
  text,
  gender,
  age,
  date,
  region,
  city,
  _id,
  full,
  admin,
  ...rest
}) => {
  return (
    <Card style={{ padding: 0 }}>
      <div
        className={classes.PostItem}
        style={{ filter: admin && 'hue-rotate(180deg)' }}
      >
        <div className={classes.TopPart}>
          <div className={classes.GenderAge}>
            {gender}
            {gender && <>, </>}
            {age}
          </div>
          <div className={classes.Location}>
            {city && <>{city}, </>}
            {region}
          </div>
        </div>
        <div className={classes.TextPart}>
          <span style={{ fontWeight: admin && '700' }}>
            {full ? text : text.slice(0, 50)}
            {text.length > 50 && '..'}
          </span>

          {full && (
            <div className={classes.Socials}>
              {socials.map(social => {
                const name = social.name;
                const link = social.link;
                if (rest[name]) {
                  return (
                    <div className={classes.Social} key={name}>
                      <span>{name}:</span>
                      {link && (
                        <a
                          href={link.replace('username', rest[name])}
                          target="_blank"
                          rel="noreferrer"
                          data="noicon"
                        >
                          {rest[name]}
                        </a>
                      )}
                      {!link && <span>{rest[name]}</span>}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
        <div className={classes.BottomPart}>
          <p>{dateToTimeAgo(date)}</p>
          {!full && (
            <Link to={pathnames.POST.replace(':postId', _id)}>Lue lisää</Link>
          )}
        </div>
      </div>
    </Card>
  );
};

PostItem.propTypes = {
  text: PropTypes.string,
  gender: PropTypes.string,
  age: PropTypes.number,
  region: PropTypes.string,
  city: PropTypes.string,
  _id: PropTypes.string,
  full: PropTypes.bool,
  admin: PropTypes.bool
};

export default PostItem;
