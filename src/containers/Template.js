import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer'

injectTapEventPlugin()

class Template extends Component {
	render() {
		return(
			<MuiThemeProvider>
				<div>
					<NavDrawer/>
					<main>
						{this.props.children}
					</main>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default Template