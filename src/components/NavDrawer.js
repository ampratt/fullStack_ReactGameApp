import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import { Link } from 'react-router'

class NavDrawer extends Component {
	state = {
		open: true
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
				<FloatingActionButton
					onTouchTap={this.toggleDrawer}> 
					<Menu/>
				</FloatingActionButton>
				<Drawer
					open={this.state.open}
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