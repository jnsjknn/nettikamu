import React, { useState, useEffect } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignOutAlt,
  faBell,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import pathnames from '../../../assets/data/pathnames';
import { logout } from '../../../actions/auth';
import { markNotificationRead } from '../../../actions/posts';
import PropTypes from 'prop-types';
import dateToTimeAgo from '../../../utils/dateToTimeAgo';

const Navbar = ({
  isAuthenticated,
  logout,
  notifications,
  seenNotifications,
  markNotificationRead
}) => {
  const [unseenNotificationCount, setUnseenNotificationCount] = useState(1);
  const [showNotifications, toggleShowNotifications] = useState(false);
  useEffect(() => {
    if (notifications && seenNotifications) {
      const unseenNotifications = notifications.filter(notification => {
        return !seenNotifications.includes(notification._id);
      });

      setUnseenNotificationCount(unseenNotifications.length);
    }
  }, [seenNotifications, notifications]);

  const notificationBellClassList = [classes.NotificationBell];
  if (unseenNotificationCount > 0) {
    notificationBellClassList.push(classes.Bounce);
  }
  return (
    <div className={classes.NavbarWrapper}>
      <nav className={classes.Navbar}>
        <NavLink exact activeClassName="activeNavLink" to={pathnames.INDEX}>
          Nettikamu
        </NavLink>
        <ul className={classes.NavLinks}>
          {isAuthenticated && (
            <>
              <li
                className={notificationBellClassList.join(' ')}
                style={{ color: '' }}
              >
                <div
                  onClick={() => toggleShowNotifications(!showNotifications)}
                >
                  <FontAwesomeIcon icon={faBell} />
                  {unseenNotificationCount > 0 && (
                    <span className={classes.NotificationNumber}>
                      {unseenNotificationCount}
                    </span>
                  )}
                </div>
              </li>
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
      {showNotifications && (
        <div className={classes.Notifications}>
          <span onClick={() => toggleShowNotifications(!showNotifications)}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <h3>Ilmoitukset</h3>
          {notifications.filter(
            notification => !seenNotifications.includes(notification._id)
          ).length === 0 && (
            <div className={classes.Notification}>Ei ilmoituksia</div>
          )}
          {notifications.map(notification => {
            return seenNotifications.includes(notification._id) ? null : (
              <div key={notification._id} className={classes.Notification}>
                <div className={classes.NotifText}>{notification.text}</div>
                <div className={classes.NotifDate}>
                  {dateToTimeAgo(notification.date)}
                </div>
                <div
                  className={classes.NotifSeenBtn}
                  onClick={() => markNotificationRead(notification._id)}
                >
                  Merkkaa luetuksi
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  markNotificationRead: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  seenNotifications: PropTypes.array,
  notification: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  seenNotifications: state.auth.user?.seenNotifications,
  notifications: state.auth.user?.notifications
});

export default connect(mapStateToProps, { logout, markNotificationRead })(
  Navbar
);
