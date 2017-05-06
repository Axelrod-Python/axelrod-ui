/* tslint:disable:no-var-requires object-literal-sort-keys */
delete process.env.BROWSER;

import * as compression from 'compression';
import * as express from 'express';
import * as http from 'http';
import * as logger from 'morgan';
import * as  React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
// import {  match, RouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';

import Application from '../src/components/application';
import reducers from '../src/reducers/root_reducer';

const appconfig = require('../package.json');

const allowCrossDomain = function(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

let server: any;

const app = express(); // delcare application
const PORT = process.env.PORT || 4000;

app.use(compression()); // compress compatible files for quicker client load time
app.use(logger('dev')); // log content
app.use(allowCrossDomain);

// Set path to public assets
app.use('/static', express.static('dist'));

/**
 * For every request send the URL to React Router The router will return the content that should be 
 * delivered to the user. If the URL does not match any route, a 404 will be returned. 
 *
 * React renders the component that should be returned in string format, and that string is served to the
 * client in an html form with static resources attached to it. After this page is loaded, any links o
 * routing that takes place will be handled purely by the javascript in react router.
 */
const context: any = {};
app.use('*', (req: any, res: any) => {
  const createStoreWithMiddleware = applyMiddleware()(createStore);
  const html = renderToString((
    <Provider store={createStoreWithMiddleware(reducers)} >
      <StaticRouter location={req.url} context={context} >
        <Application />
      </StaticRouter>
    </Provider >
  ));
  if (context.url) {
    res.writeHead(302, {
      Location: context.url,
    });
    res.end();
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.write(renderFullPage(html, appconfig.version));
    res.end();
  }
});

// create server based on application configuration
server = http.createServer(app);

// start the server listening on specified port
server.listen(PORT);

/**
 * Takes a react rendering in string format and returns a full html page.
 *
 * @param {string} html - react component to be rendered
 * @param {string} version - application version from package.json
 * @return {string} full html page
 */
function renderFullPage(html: string, version: string) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/static/bundle.min.${version}.css">
      </head>
      <body id="app-body">
        <div id="app-container">${html}</div>
      </body>
      <script src="/static/bundle.min.${version}.js"></script>
    </html>
  `;
}