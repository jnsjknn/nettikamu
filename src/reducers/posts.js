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
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  posts: [],
  pages: 1,
  page: 1,
  posted: false,
  post: {}
};

const posts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload.posts,
        pages: payload.pages,
        page: payload.page
      };
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        pages: 1,
        page: 1
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posted: true,
        loading: false
      };
    case CREATE_POST_FAIL:
    case DELETE_POST_SUCCESS:
    case DELETE_POST_FAIL:
    case LOAD_POST_FAIL:
    case SEND_MESSAGE_SUCCESS:
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        loading: false
      };
    case SET_POSTED_FALSE:
      return {
        ...state,
        posted: false
      };
    default:
      return state;
  }
};

export default posts;
