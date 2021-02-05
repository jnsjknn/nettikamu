import React from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';
import { logout } from '../../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <div className={classes.NavbarWrapper}>
      <nav className={classes.Navbar}>
        <NavLink exact activeClassName="activeNavLink" to={pathnames.INDEX}>
          Nettikamu
        </NavLink>
        <ul className={classes.NavLinks}>
          {isAuthenticated && (
            <>
              <li>
                <NavLink to={pathnames.PROFILE} activeClassName="activeNavLink">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
              <li>
                <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
              </li>
            </>
          )}
          {!isAuthenticated && (
            <NavLink to={pathnames.LOGIN} activeClassName="activeNavLink">
              Kirjaudu
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
