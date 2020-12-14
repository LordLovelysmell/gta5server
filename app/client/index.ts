require('./helpers/cKeys')

import { Browser } from './Basic/Browser'
import { Camera } from './Basic/Camera'
import { cCharacterEditor } from './Basic/cCharacterEditor'

const browser = new Browser({ url: 'package://RP/Browsers/index.html' })

const camera = new Camera({
  name: 'default',
  position: new mp.Vector3(67.58, 54.43, 73.58),
  rotation: new mp.Vector3(0, 0, 150),
  fov: 30
})

const characterEditor = new cCharacterEditor(mp.players.local)

mp.events.add({
  'cLogin-initLogin': () => {
    camera.setActive(true)
  },
  'cLogin-destroyLoginCamera': () => {
    camera.destroy()
    browser.setScreenState({ showChat: true, showCursor: false, showRadar: true, isBlurred: false })
    browser.execute(`router.push({ name: 'main' })`)
  },
  'cLogin-sendAuthResponse': (errorResponse) => {
    browser.execute(`appData.commit('auth/setAlertMessage', '${errorResponse}');`)
  },
  'cCharacterEditor-prepareCharacterEditor': () => {
    browser.setScreenState({ showChat: false, showCursor: true, showRadar: false, isBlurred: false })
    characterEditor.prepareCharacterEditor()
    browser.execute(`router.push({ name: 'character-editor' })`);

    camera.setCoord(402.8664, -997.5515, -98.5)
    camera.pointAtCoord(402.8664, -996.4108, -98.5)
    camera.setActive(true)

    mp.game.cam.renderScriptCams(true, false, 0, true, false)
    setTimeout(() => {
      mp.gui.cursor.show(true, true)
    }, 1)
  },
  'cCharacterEditor-saveCharacter': () => {
    browser.setScreenState({ showChat: true, showCursor: true, showRadar: true, isBlurred: false })
    browser.execute(`router.push({ name: 'main' })`)
    camera.setActive(false)
    setTimeout(() => {
      mp.gui.cursor.show(false, false)
    }, 1)
    mp.game.cam.renderScriptCams(false, true, 2500, true, false)
    setTimeout(() => {
      mp.game.cam.doScreenFadeOut(1500)
    }, 1500)
    setTimeout(() => {
      characterEditor.saveCharacter()
    }, 3000)
    setTimeout(() => {
      mp.game.cam.doScreenFadeIn(1000)
    }, 3500)
  },
  'callServerEvent': (eventName, data) => {
    mp.events.callRemote(eventName, data)
  },
})
