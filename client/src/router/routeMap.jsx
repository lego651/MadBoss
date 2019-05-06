import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

// import Home from '../pages/Home'
// import Login from '../pages/Login'
import HomePage from '../containers/HomePage'
import LoginPage from '../containers/LoginPage'
import AppPage from '../containers/AppPage'
import AccountPage from '../containers/AccountPage'
import CreatePage from '../containers/CreatePage'
import PlanPage from '../containers/PlanPage'
import SideNav from '../components/SideNav'
import Tasks from '../pages/Tasks'
import About from '../pages/About'
import Test from '../components/Test'
import TestUpload from '../pages/TestUploadImage'

// import ComposedAuth from '../middlewares/ComposedAuth';
import RequireAuth from '../middlewares/RequireAuth'

export const RouteMap = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/app" component={AppPage}/>
          <Route exact path="/account" component={RequireAuth(AccountPage)}/>
          <Route exact path="/create" component={RequireAuth(CreatePage)}/>
          <Route exact path={`/plan/:id`} component={RequireAuth(PlanPage)}/>
          <Route exact path="/side" component={SideNav}/>
          <Route exact path="/tasks" component={Tasks}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/test" component={RequireAuth(Test)}/>
          <Route exact path="/upload" component={TestUpload}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
