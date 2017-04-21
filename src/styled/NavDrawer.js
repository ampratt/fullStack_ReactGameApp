import React from 'react'
import styled from 'styled-components'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'

// styled component to keep nav button to right
// created a div element with a template literal _`_
const StayVisible = styled.div`
	position: absolute;
	margin-left: ${(props) => (props.open) ? `${props.width}px` : 'none'};
	transition: margin .2s;
`

export const NavToggleButton = (props) => {
	return (
		// remember to pass the props to the component to use
		<StayVisible
			{...props}
		>
			<FloatingActionButton
				onTouchTap={props.toggle}
			>
				<Menu/>
			</FloatingActionButton>
		</StayVisible>
	)
}
