import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { logoutUser } from 'store/actions/auth';
import { SET_PROFILE_LOADING, GET_PROFILE, GET_PROFILES, GET_DEVELOPER_PROFILE, CLEAR_CURRENT_PROFILE } from 'store/actions/actionTypes';

const setProfileLoading = () => ({
  type: SET_PROFILE_LOADING,
});

const getProfile = profile => ({
  type: GET_PROFILE,
  payload: profile,
});

const getProfiles = profile => ({
  type: GET_PROFILES,
  payload: profile,
});

const getDeveloperProfile = profile => ({
  type: GET_DEVELOPER_PROFILE,
  payload: profile,
});

const clearProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});

const asyncGetProfile = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get('/api/profiles');
    dispatch(getProfile(response.data));
    return new Promise((resolve) => {
      resolve(response.data);
    });
  } catch (error) {
    dispatch(getProfile({}));
    console.log(error);
  }
};

const asyncGetProfiles = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get('/api/profiles/all');
    dispatch(getProfiles(response.data));
  } catch (error) {
    console.log(error);
  }
};

const asyncGetProfileByHandle = handle => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get(`/api/profiles/handle/${handle}`);
    dispatch(getDeveloperProfile(response.data));
  } catch (error) {
    console.log(error);
  }
};

const asyncCreateProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profiles', profileData);
    dispatch(asyncGetProfile());
    history.push('/dashboard');
  } catch (error) {
    throw new SubmissionError(error.response.data);
  }
};

const asyncAddExperience = (experienceData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profiles/experience', experienceData);
    dispatch(asyncGetProfile());
    history.push('/dashboard');
  } catch (error) {
    throw new SubmissionError(error.response.data);
  }
};

const asyncAddEducation = (educationData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profiles/education', educationData);
    dispatch(asyncGetProfile());
    history.push('/dashboard');
  } catch (error) {
    throw new SubmissionError(error.response.data);
  }
};

const asyncDeleteEducation = id => async (dispatch) => {
  try {
    await axios.delete(`/api/profiles/education/${id}`);
    dispatch(asyncGetProfile());
  } catch (error) {
    console.log(error);
  }
};

const asyncDeleteExperience = id => async (dispatch) => {
  try {
    await axios.delete(`/api/profiles/experience/${id}`);
    dispatch(asyncGetProfile());
  } catch (error) {
    console.log(error);
  }
};

const deleteAccount = history => async (dispatch) => {
  if (window.confirm('Are You sure?')) {
    try {
      await axios.delete('/api/profiles');
      dispatch(logoutUser(history)(dispatch));
    } catch (error) {
      console.log(error);
    }
  }
};

export {
  asyncGetProfile,
  asyncGetProfiles,
  asyncGetProfileByHandle,
  asyncCreateProfile,
  asyncAddExperience,
  asyncAddEducation,
  asyncDeleteExperience,
  asyncDeleteEducation,
  clearProfile,
  deleteAccount,
};
