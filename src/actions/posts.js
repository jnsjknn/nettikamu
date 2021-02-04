import api from '../utils/api';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  SET_POSTED_FALSE,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAIL,
  SEND_BUG_REPORT_SUCCESS,
  SEND_BUG_REPORT_FAIL
} from './types';

export const sendBugReport = text => async dispatch => {
  const body = JSON.stringify({ text });
  try {
    await api.post('/posts/bugreport', body);
    dispatch({ type: SEND_BUG_REPORT_SUCCESS });
    dispatch(
      setAlert({
        msg: 'Kiitos ilmoituksesta! Jokaisesta ilmoituksesta on paljon apua!',
        type: 'Info'
      })
    );
  } catch (err) {
    dispatch({ type: SEND_BUG_REPORT_FAIL });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
  }
};

export const loadPostById = id => async dispatch => {
  try {
    const res = await api.get(`/posts/${id}`);
    dispatch({ type: LOAD_POST_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: LOAD_POST_FAIL });
  }
};

export const loadPosts = query => async dispatch => {
  const body = JSON.stringify(query);
  try {
    const res = await api.post('/posts', body);
    dispatch({ type: LOAD_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOAD_POSTS_FAIL });
  }
};

export const createPost = postText => async dispatch => {
  const body = JSON.stringify({ text: postText });
  try {
    await api.post('/posts/create', body);
    dispatch({ type: CREATE_POST_SUCCESS });
    dispatch(setAlert({ msg: 'Ilmoitus julkaistu!', type: 'Success' }));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert({ msg: error.msg, type: 'Error' }))
      );
    }
    dispatch({ type: CREATE_POST_FAIL });
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await api.delete(`/posts/${postId}`);
    dispatch({ type: DELETE_POST_SUCCESS });
    dispatch(setAlert({ msg: 'Julkaisu poistettu!', type: 'Success' }));
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({ type: DELETE_POST_FAIL });
    dispatch(setAlert({ msg: 'Jokin meni pieleen', type: 'Error' }));
  }
};

export const setPostedToFalse = () => dispatch => {
  dispatch({ type: SET_POSTED_FALSE });
};
