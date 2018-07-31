import createReducer from 'utils/createReducer';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from 'store/actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const setCurrentUser = (state, { payload }) => ({
  ...state,
  isAuthenticated: true,
  user: payload,
});

const removeCurrentUser = state => ({
  ...state,
  isAuthenticated: false,
  user: {},
});

export default createReducer(initialState, {
  [SET_CURRENT_USER]: setCurrentUser,
  [REMOVE_CURRENT_USER]: removeCurrentUser,
});
