import React from 'react';
import {Route, Router, IndexRoute} from 'react-router';
import {LoginPage, Layout, ReadMe} from '../containers';

export default(
  <Router>
    <Route path="/" component={Layout}>
      <IndexRoute component={ReadMe} />
    </Route>
    <Route path="login" component={LoginPage} />
  </Router>
);
