import React, { Component } from 'react'
import { Container, Name, GameListHeader, GameList, GameRecord, Column, ColumnLabels } from '../styled/Profile'
import Relay from 'react-relay'

class Profile extends Component {

	// dummy data
	static defaultProps = {
		user: {
			email: 'USER_EMAIL',
			games: [
				{
				 	winner: true,
				 	createdAt: '18/04/2017',
				 	id: '0001'
			 	},
				{
				 	winner: true,
				 	createdAt: '19/04/2017',
				 	id: '0002'
			 	},
				{
				 	winner: true,
				 	createdAt: '20/04/2017',
				 	id: '0003'
			 	}
			] 
		}
	}

	// automatically called when component loads
	get records() {
		return this.props.user.games.map( (game, index) => {
			return (
				<GameRecord
					key={index}
					index={index}
				>
					<Column>
						{(game.winner) ? 'Won!' : "Didn't win"}
					</Column>
					<Column>
						"ROBOT"
					</Column>
					<Column>
						"No"
					</Column>
					<Column>
						{game.createdAt}
					</Column>
				</GameRecord>
			)
		})
	}

	render() {
		let { email } = this.props.user
		return(
			<Container>
				<Name>
					{email}
				</Name>
				<GameList>
					<GameListHeader>
						MyGames
					</GameListHeader>
					<ColumnLabels>
						<Column>
							Outcome
						</Column>
						<Column>
							Guess
						</Column>
						<Column>
							Guessed Correctly
						</Column>
						<Column>
							Date
						</Column>
					</ColumnLabels>
					{this.records}
				</GameList>
			</Container>
		)
	}
}


// args:
// 1) component to be attached
// 2) obj to specifiy which fragments to be provided to Template
export default Relay.createContainer(
	Profile, {
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
// export default Profile