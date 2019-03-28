import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import PagesList from '../components/Pages/List'

export default () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/pages" component={PagesList} />
        </Switch>
    </Router>
  );
};
