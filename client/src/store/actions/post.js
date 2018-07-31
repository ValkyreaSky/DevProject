import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { SET_POST_LOADING, GET_POST, GET_POSTS, ADD_POST, REMOVE_POST } from 'store/actions/actionTypes';

const setPostLoading = () => ({
  type: SET_POST_LOADING,
});

const getPost = post => ({
  type: GET_POST,
  payload: post,
});

const getPosts = posts => ({
  type: GET_POSTS,
  payload: posts,
});

const addPost = postData => ({
  type: ADD_POST,
  payload: postData,
});

const removePost = postId => ({
  type: REMOVE_POST,
  payload: postId,
});

const asyncGetPost = postId => async (dispatch) => {
  try {
    dispatch(setPostLoading());
    const response = await axios.get(`/api/posts/${postId}`);
    dispatch(getPost(response.data));
  } catch (error) {
    console.log(error);
  }
};

const asyncGetPosts = () => async (dispatch) => {
  try {
    dispatch(setPostLoading());
    const response = await axios.get('/api/posts');
    dispatch(getPosts(response.data));
  } catch (error) {
    console.log(error);
  }
};

const asyncAddPost = postData => async (dispatch) => {
  try {
    dispatch(setPostLoading());
    const response = await axios.post('/api/posts', postData);
    dispatch(addPost(response.data));
  } catch (error) {
    throw new SubmissionError(error.response.data);
  }
};

const asyncRemovePost = postId => async (dispatch) => {
  try {
    dispatch(setPostLoading());
    await axios.delete(`/api/posts/${postId}`);
    dispatch(removePost(postId));
  } catch (error) {
    console.log(error);
  }
};

const asyncAddLike = postId => async (dispatch) => {
  try {
    await axios.post(`/api/posts/like/${postId}`);
    dispatch(asyncGetPosts());
  } catch (error) {
    console.log(error);
  }
};

const asyncRemoveLike = postId => async (dispatch) => {
  try {
    await axios.post(`/api/posts/unlike/${postId}`);
    dispatch(asyncGetPosts());
  } catch (error) {
    console.log(error);
  }
};

const asyncAddComment = (postId, commentData) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/posts/comment/${postId}`, commentData);
    dispatch(getPost(response.data));
  } catch (error) {
    throw new SubmissionError(error.response.data);
  }
};

const asyncRemoveComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch(asyncGetPost(postId));
  } catch (error) {
    console.log(error);
  }
};

export {
  asyncGetPost,
  asyncGetPosts,
  asyncAddPost,
  asyncRemovePost,
  asyncAddLike,
  asyncRemoveLike,
  asyncAddComment,
  asyncRemoveComment,
};
