import axios from 'axios';
import { SubmissionError } from 'redux-form';
import jwtDecode from 'jwt-decode';
import setAuthToken from 'utils/setAuthToken';
import { clearProfile } from 'store/actions/profile';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from 'store/actions/actionTypes';

const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData,
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

const asyncLoginUser = (userData, history) => async (dispatch) => {
  try {
    const response = await axios.post('/api/users/login', userData);
    // Get token from response.
    const { token } = response.data;
    // Save token to local storage.
    localStorage.setItem('jwtToken', token);
    // Save token in 'Authorization' header.
    setAuthToken(token);
    // Decode token.
    const decoded = jwtDecode(token);
    // Set current user data.
    dispatch(setCurrentUser(decoded));
    // Redirect to dashboard.
    history.push('/dashboard');
  } catch (err) {
    console.log(err);
    throw new SubmissionError(err.response.data);
  }
};

const asyncRegisterUser = (userData, history) => async (dispatch) => {
  try {
    // Send post request with register form data.
    await axios.post('/api/users/register', userData);
    // Login user.
    dispatch(asyncLoginUser({
      email: userData.email, password: userData.password,
    }, history));
  } catch (err) {
    throw new SubmissionError(err.response.data);
  }
};

const logoutUser = history => dispatch => () => {
  // Remove token from local storeage.
  localStorage.removeItem('jwtToken');
  // Remove token from 'Authorization' header.
  setAuthToken(false);
  // Remove current user data.
  dispatch(removeCurrentUser());
  // Clear current user profile.
  dispatch(clearProfile());
  // Redirect user to landing page.
  history.push('/');
};

export {
  asyncRegisterUser,
  asyncLoginUser,
  setCurrentUser,
  logoutUser,
};
