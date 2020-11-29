"use strict"

const misc = require('../helpers/cMisc')

class ClientLogin {
	constructor() {
		mp.events.add({
			'cLogin-ShowLoginPage': () => {
				misc.prepareToCef(1)
				misc.createCam(67.58, 54.43, 73.58, 0, 0, 150, 30)
				misc.openCef('package://RP/Browsers/Login/login.html')
			},
			'cLogin-ShowRegistrationPage': () => {
				misc.prepareToCef(1)
				misc.createCam(67.58, 54.43, 73.58, 0, 0, 150, 30)
				misc.openCef('package://RP/Browsers/Login/registration.html')
			},
		})
	}
}

new ClientLogin()
