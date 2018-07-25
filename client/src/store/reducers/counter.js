import { INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER } from 'store/actions/actionTypes';
import createReducer from 'utils/createReducer';

const initialState = {
  lastAction: '',
  counter: 0,
};

const incrementCounter = (state, { payload }) => ({
  ...state,
  lastAction: payload,
  counter: state.counter + 1,
});

const decrementCounter = (state, { payload }) => ({
  ...state,
  lastAction: payload,
  counter: state.counter + 1,
});

const resetCounter = (state, { payload }) => ({
  ...state,
  lastAction: payload,
  counter: 0,
});

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
  [RESET_COUNTER]: resetCounter,
});
