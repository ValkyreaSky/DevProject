import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import counterReducer from 'store/reducers/counter';

const composeEnhancers = (
  /* eslint-disable no-underscore-dangle */
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose
);

const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
