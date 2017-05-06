import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app-container')
  );
};

render(App);

// TypeScript declaration for module.hot
declare const module: { hot: any };
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    // If we receive a HMR request for our App container,
    // then reload it using require (we can't do this dynamically with import)
    const NextApp = require('./app').default;
    render(NextApp);
  });
}
