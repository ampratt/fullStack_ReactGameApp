import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import Routes from './routes'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer'
import { relayApi } from './config/endpoints'
import auth from './utils/auth'


const createHeaders = () => {
	// access id token from local storage
	let idToken = auth.getToken()
	if (idToken) {
		return {
			Authorization: `Bearer ${idToken}`
		}
	} else {
		return {}
	}
}

Relay.injectNetworkLayer(
	new RelayNetworkLayer([
		urlMiddleware({
			url: (req) => relayApi, 
		}),
		next => req => {
			req.header = {
				...req.headers,
				...createHeaders()
			}
			return next(req)
		},
	],{ disableBatchQuery: true })
)


ReactDOM.render(
  <Router
  	environment={Relay.Store} 	// relay work off Flux state management
  	render={applyRouterMiddleware(useRelay)}
  	history={browserHistory} 	// allows nice, pretty url and browser back/forward button
  	routes={Routes}
  />,
  document.getElementById('root')
)
