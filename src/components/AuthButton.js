import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const AuthButton = (props) => {
	// look 2 different ways dependent on logged in status
	if (props.authenticated) {
		return (
			<RaisedButton 
				label='Logout'
				onTouchTap={props.auth.logout}
				fullWidth={true}
				secondary	// implicit true
			/>
		)
	} else {
		return (
			<RaisedButton
				label={'Login / Signup'}
				onTouchTap={props.auth.showLock}
				fullWidth={true}
				primary
			/>
		)
	}

}


export default AuthButton