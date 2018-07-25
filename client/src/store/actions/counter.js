import { INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER } from 'store/actions/actionTypes';

const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
  payload: 'Increment',
});

const decrementCounter = () => ({
  type: DECREMENT_COUNTER,
  payload: 'Decrement',
});

const resetCounter = () => ({
  type: RESET_COUNTER,
  payload: 'Reset',
});

export {
  incrementCounter,
  decrementCounter,
  resetCounter,
};
