import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import posts from './posts';

export default combineReducers({ alerts, auth, posts });
