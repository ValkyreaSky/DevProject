import createReducer from 'utils/createReducer';
import { SET_POST_LOADING, GET_POST, GET_POSTS, ADD_POST, REMOVE_POST } from 'store/actions/actionTypes';

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

const setPostLoading = state => ({
  ...state,
  loading: true,
});

const getPost = (state, { payload }) => ({
  ...state,
  post: payload,
  loading: false,
});

const getPosts = (state, { payload }) => ({
  ...state,
  posts: payload,
  loading: false,
});

const addPost = (state, { payload }) => ({
  ...state,
  posts: [payload, ...state.posts],
  loading: false,
});

const removePost = (state, { payload }) => ({
  ...state,
  posts: state.posts.filter(post => post._id !== payload),
  loading: false,
});

export default createReducer(initialState, {
  [SET_POST_LOADING]: setPostLoading,
  [GET_POSTS]: getPosts,
  [GET_POST]: getPost,
  [ADD_POST]: addPost,
  [REMOVE_POST]: removePost,
});
