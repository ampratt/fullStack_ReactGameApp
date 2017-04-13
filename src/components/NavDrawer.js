import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router'
import { NavToggleButton } from '../styled/NavDrawer'

class NavDrawer extends Component {
	state = {
		open: true,
		width: 250
	}

	toggleDrawer = () => {
		this.setState((prevState, props) => {
			return {
				open: !prevState.open
			}
		})
		// this.setState({ open: !this.state.open })
	}

	render() {
		return (
			<div>
				<NavToggleButton
					toggleDrawer={this.toggleDrawer}
					width={this.state.width} 
					open={this.state.open}
				/>
				<Drawer
					open={this.state.open}
					width={this.state.width}
				>
					<div style={{
						height: '200px',
						width: "100%",
						backgroundColor: "salmon"
					}}>
						Login Container
					</div>
					<Divider/>
					<Link to={'/'}>
						<MenuItem primaryText={'Play'} 
								  onTouchTap={this.toggleDrawer} />
					</Link>
					<Link to={'/profile'}>
						<MenuItem primaryText={'Profile'} 
								  onTouchTap={this.toggleDrawer} />
					</Link>
				</Drawer>
			</div>
		)
	}
}

export default NavDrawer