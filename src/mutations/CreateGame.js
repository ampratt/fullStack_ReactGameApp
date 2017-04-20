import Relay from 'react-relay'

export default class CreateGame extends Relay.Mutation {

	// prepare data that will be sent as input arguments in the GraphQL mutation
	getVariables() {
		return {
			// p1player: this.props.p1player,
			// winner: this.props.winner,
			p1playerId: this.props.user.id,
			winnerId: this.props.winnerId,
			p1Guess: this.props.guess,
			p1GuessCorrect: this.props.guessCorrect
		}
	}

	// GraphQL mutation that we want to use
	getMutation() {
		return Relay.QL`mutation{createGame}` // mutation provided by graphQL
	}

	// read any changed data from Store
	getFatQuery() {
		return Relay.QL`
			fragment on CreateGamePayload {
				p1player
			}
		`
	}

	// tells Relay how to deal with the response data
	getConfigs() {
		return [
			{
				type: 'RANGE_ADD',
				parentName: 'p1player',
				parentID: this.props.user.id,
				connectionName: 'p1games',
				edgeName: 'edge',
				rangeBehaviors: {
					'': 'append',
				},
			},
		]
	}

}