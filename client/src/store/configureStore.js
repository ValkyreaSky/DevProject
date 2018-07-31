import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from 'store/reducers/auth';
import profileReducer from 'store/reducers/profile';
import postReducer from 'store/reducers/post';

const composeEnhancers = (
  /* eslint-disable no-underscore-dangle */
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose
);

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  profile: profileReducer,
  post: postReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
