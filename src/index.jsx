import 'babel-polyfill';
import React from 'react';
import useBasename from 'history/lib/useBasename';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import './favicon.ico';
import './styles/main.scss';
import routes from './routes';
import configureStore from './store';
import { restoreSessionFromLocalStorage } from './actions/session';


function withBasename(history, dirname) {
  return useBasename(() => history)({ basename: `/${dirname}` });
}

// start app
const store = configureStore();
// get session back
store.dispatch(restoreSessionFromLocalStorage());

let baseUrl = __BASE__;
if (baseUrl && baseUrl.charAt(0) === '/') {
  baseUrl = baseUrl.substring(1);
}

render(
  <Provider store={store}>
    <Router history={withBasename(browserHistory, baseUrl)} routes={routes} />
  </Provider>, document.getElementById('app')
);
