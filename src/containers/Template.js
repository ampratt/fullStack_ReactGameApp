import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer'
import { Header, Main } from '../styled/Template'
import Relay from 'react-relay'

injectTapEventPlugin()

class Template extends Component {
	render() {
		return(
			<MuiThemeProvider>
				<div>
					<NavDrawer
						auth={this.props.route.auth}	// access props from parent route
						authenticated={this.props.viewer.user}	// passes true or null
					/>
					<Header>
						TicTacToe
					</Header>
					<Main>
						{this.props.children}
					</Main>
				</div>
			</MuiThemeProvider>
		)
	}
}

// args:
// 1) component to be attached
// 2) obj to specifiy which fragments to be provided to Template
export default Relay.createContainer(
  Template, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `,
    }
  }
)