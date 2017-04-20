import React from 'react'
import styled from 'styled-components'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'

// styled component to keep nav button to right
// created a div element with a template literal _`_
const StayVisible = styled.div`	
	position: absolute;
	margin-left: ${(props) => (props.open) ? `${props.width}px` : 'none' };
	transition: margin .2s;
`

// remember to pass the props to the component to use
export const NavToggleButton = (props) => {
	return (
		<StayVisible 
			{...props} 
		>
			<FloatingActionButton
				onTouchTap={props.toggleDrawer}
			>
				<Menu />
			</FloatingActionButton>
		</StayVisible>
	)
}