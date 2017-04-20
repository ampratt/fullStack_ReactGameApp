import Relay from 'react-relay'

export default class SigninUser extends Relay.Mutation {

	// prepare data that will be sent as input arguments in the GraphQL mutation
	getVariables() {
		return {
			auth0: {
				idToken: this.props.idToken
			}
		}
	}

	// GraphQL mutation that we want to use
	getMutation () {
		return Relay.QL`mutation{signinUser}`
	}

	// read any changed data from Store
	getFatQuery () {
		return Relay.QL`
			fragment on SigninPayload {
				viewer
			}
		`
	}

	// tells Relay how to deal with the response data
	getConfigs() {
		return [
			{
				type: 'REQUIRED_CHILDREN',
				children: [
					Relay.QL`
						fragment on SigninPayload {
							viewer {
								user {
									id
								}
							}
						}
					`
				]
			}
		]
	}

}