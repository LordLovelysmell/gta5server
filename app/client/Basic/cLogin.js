"use strict"

import { prepareToCef, createCam, openCef } from '../helpers/cMisc'

class ClientLogin {
	constructor() {
		mp.events.add({
			'cLogin-ShowLoginPage': () => {
				prepareToCef(1)
				createCam(67.58, 54.43, 73.58, 0, 0, 150, 30)
				openCef('package://RP/Browsers/Login/login.html')
			},
			'cLogin-ShowRegistrationPage': () => {
				prepareToCef(1)
				createCam(67.58, 54.43, 73.58, 0, 0, 150, 30)
				openCef('package://RP/Browsers/Login/registration.html')
			},
		})
	}
}

new ClientLogin()
