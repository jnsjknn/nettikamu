import React from 'react';
import classes from './Alert.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from './Alert';

const AlertContainer = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
    return (
      <div className={classes.AlertContainer}>
        {alerts.map(alert => {
          const { msg, id, timeout, type } = alert;
          return (
            <Alert key={id} msg={msg} timeout={timeout} type={type} id={id} />
          );
        })}
      </div>
    );
  } else return null;
};

AlertContainer.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(AlertContainer);
