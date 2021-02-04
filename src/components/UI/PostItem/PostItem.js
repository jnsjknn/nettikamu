import React from 'react';
import classes from './PostItem.module.css';
import { Link } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';
import dateToTimeAgo from '../../../utils/dateToTimeAgo';
import Card from '../Card/Card';
import socials from '../../../assets/data/socials';

const PostItem = ({
  text,
  gender,
  age,
  date,
  region,
  city,
  _id,
  full,
  ...rest
}) => {
  return (
    <Card
      style={{
        margin: full ? '65px auto 0 auto' : '0 auto',
        padding: 0
      }}
    >
      <div
        className={classes.PostItem}
        style={{ filter: rest.admin && 'hue-rotate(180deg)' }}
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
          <span style={{ fontWeight: rest.admin && '700' }}>
            {full ? text : text.slice(0, 100) + '..'}
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
                      {/*<a
                        href={link.replace('username', rest[name])}
                        target="_blank"
                        rel="noreferrer"
                        data="noicon"
                      >
                        {rest[name]}
                      </a>*/}
                      <span>{rest[name]}</span>
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

export default PostItem;
