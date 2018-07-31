import createReducer from 'utils/createReducer';
import { SET_PROFILE_LOADING, GET_PROFILE, GET_PROFILES, GET_DEVELOPER_PROFILE, CLEAR_CURRENT_PROFILE } from 'store/actions/actionTypes';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  developerProfile: null,
};

const setProfileLoading = state => ({
  ...state,
  loading: true,
});

const getProfile = (state, { payload }) => ({
  ...state,
  loading: false,
  profile: payload,
});

const getProfiles = (state, { payload }) => ({
  ...state,
  loading: false,
  profiles: payload,
});

const getDeveloperProfile = (state, { payload }) => ({
  ...state,
  developerProfile: payload,
  loading: false,
});

const clearProfile = state => ({
  ...state,
  loading: false,
  profile: null,
});

export default createReducer(initialState, {
  [SET_PROFILE_LOADING]: setProfileLoading,
  [GET_PROFILE]: getProfile,
  [GET_PROFILES]: getProfiles,
  [GET_DEVELOPER_PROFILE]: getDeveloperProfile,
  [CLEAR_CURRENT_PROFILE]: clearProfile,
});
