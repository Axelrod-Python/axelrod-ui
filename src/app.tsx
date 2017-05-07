import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import * as promise from 'redux-promise';

import Application from './components/application';
import reducers from './reducers/root_reducer';
import { IReduxState } from "./constants/interfaces";
import Strategy from "./models/strategy";

// tslint:disable-next-line:no-var-requires
const { createBrowserHistory } = require('history'); // temporary until type definitions are worked out
const history = createBrowserHistory({ basename: '/axelrod' });
const middleware = routerMiddleware(history);

const createStoreWithMiddleware = applyMiddleware(middleware, promise)(createStore);

// require all .scss files for deploy if we are not server rendering
// process.env.BROWSER is set in webpack.config.ts in development but deleted
// in the express.js server. This way no .scss files are required while in
// node which will throw an error, but webpack still bundles them.
declare const require: any; // silence TS error on module
if (process.env.BROWSER) {
  const requireAll = (r: any) => r.keys().forEach(r);
  requireAll(require.context('./sass/', true, /\.scss$/));
}

// configure redux dev tools
declare const window: any; // make typescript happy
let store: Store<any>;
if (process.env.NODE_ENV === 'production') {
  // production mode with server side rendering, load the strategies
  // from the embedded window variable
  const preloadedState: IReduxState = window.__PRELOADED_STATE__;

  // convert raw strategy object literals to Strategy objects
  preloadedState.strategy.strategies =  preloadedState.strategy.strategies.map((object: any) => (
    new Strategy(object)
  ));

  store =  createStoreWithMiddleware(reducers, preloadedState);

} else {
  store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                              window.__REDUX_DEVTOOLS_EXTENSION__());
}

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} basename="/axelrod/" >
      <Application />
    </ConnectedRouter>
  </Provider>
);

export default DragDropContext(HTML5Backend)(App);
