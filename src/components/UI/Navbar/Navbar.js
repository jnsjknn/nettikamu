import React from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';
import { logout } from '../../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <div className={classes.NavbarWrapper}>
      <nav className={classes.Navbar}>
        <Link to={pathnames.INDEX}>Nettikamu</Link>
        <ul className={classes.NavLinks}>
          {isAuthenticated && (
            <>
              <li>
                <Link to={pathnames.PROFILE}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
              </li>
            </>
          )}
          {!isAuthenticated && <Link to={pathnames.LOGIN}>Kirjaudu</Link>}
        </ul>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
