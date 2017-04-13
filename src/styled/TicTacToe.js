import React from 'react'
import { Layer, Line } from 'react-konva'

export const Board = ({unitSquare, size, rows}) => {
	let grid = []
	let stroke = 'grey'
	let strokeWidth = 10

	//compose lines
	for (let i=1; i < rows; i++){
		let position = unitSquare * i
		//vertical line
		grid.push(
			<Line
				points={[position, 0, position, size]}
				stroke={stroke}
				strokeWidth={strokeWidth}
				key={i+'v'}
			/>
		)
		//horizontal line
		grid.push(
			<Line
				points={[0, position, size, position]}
				stroke={stroke}
				strokeWidth={strokeWidth}
				key={i+'h'}
			/>
		)
	}

	return (
		<Layer>
			{grid}
		</Layer>
	)
}