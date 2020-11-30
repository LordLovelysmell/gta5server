let cef = null
let camera = null
const player = mp.players.local

// CEF //
export function prepareToCef(blurred = null) {
	mp.gui.cursor.visible = true
	mp.game.ui.displayRadar(false)
	mp.gui.chat.show(false)
	if (blurred) mp.game.graphics.transitionToBlurred(blurred)
}


export function injectCef(execute) {
	if (!cef) return
	cef.execute(execute)
}


export function openCef(url) {
	if (cef) cef.destroy()
	cef = mp.browsers.new(url)
	// injectCef('loadRusLang()')
}


export function closeCef() {
	if (cef) {
		cef.destroy()
		cef = null
	}
	mp.gui.cursor.visible = false
	mp.game.ui.displayRadar(true)
	mp.gui.chat.show(true)
	mp.game.graphics.transitionFromBlurred(1)
}
// CEF //

// CAMERA //
export function createCam(x, y, z, rx, ry, rz, viewangle) {
	camera = mp.cameras.new('Cam', { x, y, z }, { x: rx, y: ry, z: rz }, viewangle)
	camera.setActive(true)
	mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false)
}

export function destroyCam() {
	if (!camera) return
	camera.setActive(false)
	mp.game.cam.renderScriptCams(false, false, 0, false, false)
	camera.destroy()
	camera = null
}
// CAMERA //

export function browserExecute(execute) {
	if (!cef) {
		return
	}
	cef.execute(execute)
}

mp.events.add(
	{
		'cInjectCef': execute => injectCef(execute),
		'cCloseCef': () => closeCef(),
		'cDestroyCam': () => destroyCam(),

		'cCloseCefAndDestroyCam': () => {
			closeCef()
			destroyCam()
			console.log('cCloseCefAndDestroyCamevent')
		},

		'cChangeHeading': angle => player.setHeading(angle),

		'cMisc-CallServerEvent': (eventName, data) => {
			mp.events.callRemote(eventName, data)
		},
	})
