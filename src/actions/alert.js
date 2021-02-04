import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as createUuid } from 'uuid';

export const setAlert = ({ title, msg, type, timeout = 5000 }) => dispatch => {
  const id = createUuid();
  dispatch({
    type: SET_ALERT,
    payload: { title, msg, type, timeout, id }
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, timeout);
};

export const removeAlert = id => dispatch => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
