import Auth0Lock from 'auth0-lock'

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
		console.log(authResult)
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
}

const auth = new AuthService()

export default auth