import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/Template'
import TicTacToe from '../containers/TicTacToe'
import Profile from '../containers/Profile'
import Relay from 'react-relay'
import auth from '../utils/auth'

// each route needs access to route 'viewer' from relay api
const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`
}

const userOnly = (nextState, replace) => {
  if (!auth.getToken()) {
    replace('/')
  }
}

const createRoutes = () => {
  return (
    <Route
      path='/'
      component={Template}
      queries={ViewerQueries}
      auth={auth}
    >
        <IndexRoute
          component={TicTacToe}
          queries={ViewerQueries}
        />
        <Route
          path={'/profile'}
          component={Profile}
          queries={ViewerQueries}
          onEnter={userOnly}
        />
    </Route>
  )
}

const Routes = createRoutes()

export default Routes
