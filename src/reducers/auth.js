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
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  role: 0,
  phoneNumberAccepted: false,
  passwordChanged: false
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        role: payload.role
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case DELETE_USER_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: 0
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        passwordChanged: true
      };
    case SEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        phoneNumberAccepted: true
      };
    case SEND_VERIFICATION_FAIL:
    case VERIFICATION_SUCCESS:
    case VERIFICATION_FAIL:
    case PASSWORD_CHANGE_FAIL:
    case UPDATE_SOCIALS_SUCCESS:
    case UPDATE_SOCIALS_FAIL:
    case UPDATE_USERNAME_SUCCESS:
    case UPDATE_USERNAME_FAIL:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_FAIL:
    case DELETE_USER_FAIL:
    case UPDATE_LOCATION_SUCCESS:
    case UPDATE_LOCATION_FAIL:
    default:
      return state;
  }
};

export default auth;
