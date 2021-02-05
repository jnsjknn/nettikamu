import React from 'react';
import classes from './Footer.module.css';
import { NavLink } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';

const Footer = () => {
  return (
    <div className={classes.FooterWrapper}>
      <div className={classes.Footer}>
        <div className={classes.Links}>
          <NavLink exact activeClassName="activeNavLink" to={pathnames.CONTACT}>
            Ota yhteyttä
          </NavLink>
          <NavLink
            exact
            activeClassName="activeNavLink"
            to={pathnames.PRIVACY_POLICY}
          >
            Tietosuoja
          </NavLink>
          <NavLink
            exact
            activeClassName="activeNavLink"
            to={pathnames.COOKIE_POLICY}
          >
            Evästeet
          </NavLink>
          <a
            href="https://github.com/jnsjknn/nettikamu"
            target="_blank"
            rel="noreferrer"
          >
            Lähdekoodi
          </a>
        </div>
        <div className={classes.CopyRight}>
          Nettikamu &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Footer;
