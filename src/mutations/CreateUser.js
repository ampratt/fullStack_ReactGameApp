import Relay from 'react-relay'

export default class CreateUser extends Relay.Mutation {

	// prepare data that will be sent as input arguments in the GraphQL mutation
	// graph.cool auth schema expects this
	getVariables() {
		return {
			email: this.props.email,
			authProvider: {
				auth0: {
					idToken: this.props.idToken
				}
			},
		}
	}

	// GraphQL mutation that we want to use
	getMutation () {
		return Relay.QL`mutation{createUser}`
	}

	// read any changed data from Store
	getFatQuery () {
		return Relay.QL`
			fragment on CreateUserPayload {
				user
				viewer
			}
		`
	}

	// tells Relay how to deal with the response data
	getConfigs() {
		return [
			{
				type: 'RANGE_ADD',
				parentName: 'viewer',
				connectionName: 'allUsers',
				edgeName: 'user',
				rangeBehaviors: {
					'': 'append',
				},
			},
			{
				type: 'REQUIRED_CHILDREN',
				children: [
					Relay.QL`
						fragment on CreateUserPayload {
							user
						}
					`
				]
			}
		]
	}

}