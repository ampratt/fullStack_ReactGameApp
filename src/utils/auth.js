import Auth0Lock from 'auth0-lock'
import Relay from 'react-relay'
import CreateUser from '../mutations/CreateUser'
import SigninUser from '../mutations/SigninUser'
const authDomain = 'aaronpratt.eu.auth0.com'
const clientId = 'rNLmmfAmRIIQ8Oow6zY7lkv5NcebaSRo'


class AuthService {
	constructor() {
		this.lock = new Auth0Lock(clientId, authDomain, {
			// configuration object
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
		let { email, exp } = authResult.idTokenPayload
		const idToken = authResult.idToken

		this.signinUser({
			idToken,
			email,
			exp
		}).then(
			success => success,	// on success just sign-in
			rejected => {		// on failure, probably no user exists...create one
				this.createUser({
					idToken,
					email,
					exp
				}).then()
			}
		)

		// console.log(authResult)
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
	isTokenCurrent = () => {
		let expString = localStorage.getItem('exp')
		if (!expString) {
			// if no exp item, then make sure no id token exists
			localStorage.removeItem('idToken')
			return false
		}
		let now = new Date()
		let exp = new Date(parseInt(expString, 10)) // 10 is radix parameter
		if (exp < now) {
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

	getToken = () => {
		let idToken = localStorage.getItem('idToken')
		if (this.isTokenCurrent() && idToken) {
			return idToken
		} else {
			this.removeTokens()
			return false
		}
	}

	logout = () => {
		this.removeTokens()
		location.reload()
	}


	createUser = (authFields) => {
		return new Promise( (resolve, reject) => {
			// specifiy mutation to make
			Relay.Store.commitUpdate(
				// pass props to function
				new CreateUser({
					email: authFields.email,
					idToken: authFields.idToken
				}), {
					onSuccess: (response) => {
						this.signinUser(authFields)
						resolve(response)
					},
					onFailure: (response) => {
						console.log('CreateUser eror', response)
						reject(response)
					}
				}
			) // Relay.Store.commitUpdate
		}) // Promise 
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
			) // Relay.Store.commitUpdate
		}) // Promise
	}

}

const auth = new AuthService()

export default auth