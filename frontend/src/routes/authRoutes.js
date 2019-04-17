import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../components/Dashboard'
import PagesList from '../components/Pages/List'
import AddPage from '../components/Pages/Add'
import EditPage from '../components/Pages/Edit'


class AuthContent extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/pages" component={PagesList} />
          <Route exact path="/dashboard/pages/add" component={AddPage} />
          <Route exact path="/dashboard/pages/edit/:id" component={EditPage} />
          <Route path="/" render={() => <Redirect to="/dashboard"/>}/>
        </Switch>
      </Router>
    )
  }
}

export default AuthContent;
