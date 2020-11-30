"use strict"

const misc = require('../helpers/cMisc')

class ClientLogin {
	constructor() {
		mp.events.add({
			'cLogin-ShowLoginPage': () => {
				misc.prepareToCef(1)
				misc.createCam(67.58, 54.43, 73.58, 0, 0, 150, 30)
				misc.openCef('package://RP/Browsers/index.html')
			},
			'cLogin-sendAuthResponse': (string) => {
				misc.browserExecute(`appData.commit('auth/setAlertMessage', '${string}');`)
			},
		})
	}
}

new ClientLogin()
