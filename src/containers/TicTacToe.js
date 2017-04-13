import React, { Component } from 'react'
import { Stage } from 'react-konva'
import { Board } from '../styled/TicTacToe'

class TicTacToe extends Component {

	state = {
		rows: 3,
		gameState: new Array(9).fill(false),
		ownMark: 'X',
		otherMark: 'O',
		gameOver: false,
		yourTurn: true,
		winner: false,
		win: false
	}

	componentWillMount() {
	// initial setup
		let height = window.innerHeight
		let width = window.innerWidth
		let size =  (height < width) ? height *.8 : width *.8
		let rows = this.state.rows
		let unitSquare = size / rows

		// syntax: object initializer shorthand
		this.setState({
			size,
			rows, 
			unitSquare
		})
	}

	move = () => {
		//for when user moves
	}

	makeAiMove = () => {

	}

	turingTest = () => {

	}

	recordGame = () => {

	}

	render() {
		let {
			size,
			unitSquare,
			rows
		} = this.state
		return(
			<div>
				<Stage
					width={size}
					height={size}
				>
					<Board 
						unitSquare={unitSquare}
						rows={rows}
						size={size}
						/>
					{/* <Squares> / */}
				</Stage>
			</div>
		)
	}
}

export default TicTacToe