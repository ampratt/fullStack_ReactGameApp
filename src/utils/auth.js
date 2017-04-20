import Auth0Lock from 'auth0-lock'
import Relay from 'react-relay'
import CreateUser from '../mutations/CreateUser'
import SigninUser from '../mutations/SigninUser'

const authDomain = 'aaronpratt.eu.auth0.com'
const clientId = 'rNLmmfAmRIIQ8Oow6zY7lkv5NcebaSRo'

class AuthService {
	constructor() {
		this.lock = new Auth0Lock(clientId, authDomain, {
			auth: {
				params: {
					scope: 'openid email'
				},
			},
		})

		this.showLock = this.showLock.bind(this)

		// Listen for the authenticated event and get profile
		this.lock.on('authenticated', this.authProcess.bind(this))
	}

	authProcess = (authResult) => {
		let {
			email,
			exp
		} = authResult.idTokenPayload
		const idToken = authResult.idToken

		this.signinUser({
			idToken,
			email,
			exp
		}).then(
			success => success,
			rejected => {
				this.createUser({
					idToken,
					email,
					exp
				}).then()
			}
		)
	}

	showLock() {
		this.lock.show()
	}

	// take auth token and add to local storage
	setToken = (authFields) => {
		let { idToken, exp } = authFields
		localStorage.setItem('idToken', idToken)
		localStorage.setItem('exp', exp * 1000)
	}

	// graph.cool won't accept expired tokens
	isCurrent = () => {
		let expString = localStorage.getItem('exp')
		// if no exp item, then make sure no id token exists
		if (!expString) {
			localStorage.removeItem('idToken')
			return false
		}
		let now = new Date()
		let exp = new Date(parseInt(expString, 10)) //10 is radix parameter
		if ( exp < now ) {
			this.logout()
			return false
		} else {
			return true
		}
	}

	removeTokens = () => {
		localStorage.removeItem('idToken')
		localStorage.removeItem('exp')
	}

	getToken() {
		let idToken = localStorage.getItem('idToken')
		if (this.isCurrent() && idToken) {
			return idToken
		} else {
			localStorage.removeItem('idToken')
			localStorage.removeItem('exp')
			return false
		}
	}

	logout = () => {
		localStorage.removeItem('idToken')
		localStorage.removeItem('exp')
		location.reload()
	}


	// specifiy mutation to make
	createUser = (authFields) => {
		return new Promise( (resolve, reject) => {
			Relay.Store.commitUpdate(
				new CreateUser({
					email: authFields.email,
					idToken: authFields.idToken
				}), {
					onSuccess: (response) => {
						this.signinUser(authFields)
						resolve(response)
					},
					onFailure: (response) => {
						console.log('CreateUser error', response)
						reject(response)
					}
				}
			)
		}) 
	}

	signinUser = (authFields) => {
		return new Promise( (resolve, reject) => {
			Relay.Store.commitUpdate(
				new SigninUser({
					idToken: authFields.idToken
				}), {
					onSuccess: (response) => {
						this.setToken(authFields)
						resolve(response)
					},
					onFailure: (response) => {
						reject(response)
					}
				}
			)
		})
	}

}

const auth = new AuthService()

export default auth