import { setAlert } from './alert';
import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SEND_VERIFICATION_SUCCESS,
  SEND_VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  UPDATE_SOCIALS_SUCCESS,
  UPDATE_SOCIALS_FAIL,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_USERNAME_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL
} from './types';

export const loadUser = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
    const res = await api.get('/users/me');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({
  username,
  password,
  dateOfBirth,
  gender
}) => async dispatch => {
  const body = JSON.stringify({ username, password, dateOfBirth, gender });
  try {
    const res = await api.post('/users', body);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (username, password, rememberUser) => async dispatch => {
  const body = JSON.stringify({ username, password, rememberUser });
  try {
    const res = await api.post('/auth', body);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const sendVerification = (
  phoneNumber,
  auth = true
) => async dispatch => {
  try {
    if (auth) await api.get(`/auth/verify/${phoneNumber}`);
    else await api.get(`/auth/changePassword/${phoneNumber}`);
    dispatch({ type: SEND_VERIFICATION_SUCCESS });
    dispatch(setAlert({ msg: 'Vahvistusviesti lähetetty!', type: 'Success' }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: SEND_VERIFICATION_FAIL });
  }
};

export const confirmVerification = ({
  phoneNumber,
  verificationCode
}) => async dispatch => {
  const body = JSON.stringify({ phoneNumber, verificationCode });
  try {
    await api.post('/auth/verify', body);
    dispatch({ type: VERIFICATION_SUCCESS });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: VERIFICATION_FAIL });
  }
};

export const resetPassword = ({
  phoneNumber,
  verificationCode,
  newPassword
}) => async dispatch => {
  const body = JSON.stringify({ phoneNumber, verificationCode, newPassword });
  try {
    const res = await api.post('/auth/changePassword', body);
    dispatch({ type: PASSWORD_CHANGE_SUCCESS, payload: res.data });
    dispatch(setAlert({ msg: 'Salasana vaihdettu', type: 'Success' }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: PASSWORD_CHANGE_FAIL });
  }
};

export const updateSocials = newSocials => async dispatch => {
  const body = JSON.stringify({ socials: newSocials });
  try {
    await api.put('/users/me/socials', body);
    dispatch({ type: UPDATE_SOCIALS_SUCCESS });
    dispatch(setAlert({ msg: 'Käyttäjänimet päivitetty', type: 'Success' }));
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: UPDATE_SOCIALS_FAIL });
    dispatch(setAlert({ msg: 'Jokin meni pieleen', type: 'Error' }));
  }
};

export const updateUsername = newUsername => async dispatch => {
  const body = JSON.stringify({ newUsername });
  try {
    await api.put('/users/me/username', body);
    dispatch({ type: UPDATE_USERNAME_SUCCESS });
    dispatch(setAlert({ msg: 'Käyttäjänimi päivitetty', type: 'Success' }));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: UPDATE_USERNAME_FAIL });
  }
};

export const updateLocation = ({ region, city }) => async dispatch => {
  const body = JSON.stringify({ region, city });
  try {
    await api.put('/users/me/location', body);
    dispatch({ type: UPDATE_LOCATION_SUCCESS });
    dispatch(setAlert({ msg: 'Sijainti päivitetty', type: 'Success' }));
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: UPDATE_LOCATION_FAIL });
    dispatch(setAlert({ msg: 'Jokin meni pieleen', type: 'Error' }));
  }
};

export const updatePassword = (
  currentPassword,
  newPassword
) => async dispatch => {
  const body = JSON.stringify({ currentPassword, newPassword });
  try {
    await api.put('/users/me/password', body);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS });
    dispatch(setAlert({ msg: 'Salasana päivitetty', type: 'Success' }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: UPDATE_PASSWORD_FAIL });
  }
};

export const deleteUser = password => async dispatch => {
  try {
    await api.delete('/users/me');
    dispatch({ type: DELETE_USER_SUCCESS });
    dispatch(setAlert({ msg: 'Käyttäjätunnus poistettu', type: 'Success' }));
  } catch (err) {
    const errors = err.response?.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: DELETE_USER_FAIL });
  } finally {
  }
};
