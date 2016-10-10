import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import routes from './routes';
import configureStore from './store';
import { baseUrl, myHisotry} from './config';
import { restoreSessionFromLocalStorage } from './actions/session';
import './favicon.ico';
import './styles/main.scss';

// start app
const store = configureStore();

// get session back
store.dispatch(restoreSessionFromLocalStorage());

render(
  <Provider store={store}>
    <Router history={myHisotry} routes={routes} />
  </Provider>, document.getElementById('app')
);
