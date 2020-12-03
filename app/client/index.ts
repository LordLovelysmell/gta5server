require('./helpers/cKeys')

import { Browser } from './Basic/Browser'
import { Camera } from './Basic/Camera'
import { cCharacterCreator } from './Basic/cCharacterCreator'

const browser = new Browser({ url: 'package://RP/Browsers/index.html' })

const loginCamera = new Camera({
  name: 'login-camera',
  position: new mp.Vector3(67.58, 54.43, 73.58),
  rotation: new mp.Vector3(0, 0, 150),
  fov: 30
})

new cCharacterCreator(mp.players.local)

mp.events.add({
  'cLogin-initLogin': () => {
    loginCamera.setActive(true)
  },
  'cLogin-destroyLoginCamera': () => {
    loginCamera.destroy()
    browser.setScreenState({ isBrowserView: false })
    browser.execute(`router.push({ name: 'main' })`)

  },
  'cLogin-sendAuthResponse': (errorResponse) => {
    browser.execute(`appData.commit('auth/setAlertMessage', '${errorResponse}');`)
  },
  'callServerEvent': (eventName, data) => {
    mp.events.callRemote(eventName, data)
  }
})
