import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from '../components/login'
import Dashboard from '../components/dashboard'

export default () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
    </Router>
  );
};
