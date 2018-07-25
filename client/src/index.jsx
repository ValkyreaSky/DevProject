import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';
import './style.scss';

// Hot Module Replacement
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require
    ReactDOM.render(<NextApp />, document.getElementById('app'));
  });
}

ReactDOM.render(<App />, document.getElementById('app'));

registerServiceWorker();
