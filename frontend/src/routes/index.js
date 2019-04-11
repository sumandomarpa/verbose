import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import PagesList from '../components/Pages/List'
import AddPage from '../components/Pages/Add'
import EditPage from '../components/Pages/Edit'
import Signup from '../components/Signup'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/pages" component={PagesList} />
      <Route exact path="/dashboard/pages/add" component={AddPage} />
      <Route exact path="/dashboard/pages/edit/:id" component={EditPage} />
    </Switch>
  </Router>
)
