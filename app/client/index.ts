require('./helpers/cKeys')

import registerEvents from '@client/events/eventsController'
import { Browser } from './Basic/Browser'
import { Camera } from './Basic/Camera'
import { cCharacterEditor } from './Basic/cCharacterEditor'

registerEvents()

const browser = new Browser({ url: 'package://RP/Browsers/index.html' })

const camera = new Camera({
  name: 'default',
  position: new mp.Vector3(67.58, 54.43, 73.58),
  rotation: new mp.Vector3(0, 0, 150),
  fov: 30
})

const localPlayer = mp.players.local

const characterEditor = new cCharacterEditor(localPlayer)

mp.events.add({
  "render": () => {
    // Disable HUD components.    
    mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
    mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
    mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
    mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
    mp.game.ui.hideHudComponentThisFrame(8); // HUD_VEHICLE_CLASS
    mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME

    mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
    mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS
    mp.game.ui.hideHudComponentThisFrame(22); // MAX_HUD_WEAPONS

    // if (!mp.game.graphics.hasStreamedTextureDictLoaded("mphud")) {
    //   mp.game.graphics.requestStreamedTextureDict("mphud", true);
    // }

    // if (mp.game.graphics.hasStreamedTextureDictLoaded("mphud")) {
    //   mp.game.graphics.drawSprite("mphud", "mp_anim_cash", 0.5, 0.5, 0.1, 0.1, 0, 255, 255, 255, 100);
    // }

    mp.game.graphics.drawText(`X: ${localPlayer.position.x.toFixed(4)}, Y: ${localPlayer.position.y.toFixed(4)}, Z: ${localPlayer.position.z.toFixed(4)}, heading: ${localPlayer.getHeading().toFixed(2)} degrees`, [0.5, 0.95], {
      font: 0,
      color: [255, 255, 255, 185],
      scale: [0.3, 0.3],
      outline: false,
      centre: true
    })
  },
  'client/login/init': () => {
    camera.setActive(true)
  },
  'cLogin-destroyLoginCamera': () => {
    camera.destroy()
    browser.setScreenState({ showChat: true, showCursor: false, showRadar: true, isBlurred: false })
    browser.execute(`router.push({ name: 'main' })`)
  },
  'client/login/response': (errorResponse) => {
    browser.execute(`appData.commit('auth/setAlertMessage', '${errorResponse}');`)
  },
  'client/character-editor/prepare': () => {
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
    setTimeout(() => { // TODO: проверить необходимость <== этого и, вероятно, удалить
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
  'client/basic/ATM/open': (serializedData: string) => {
    browser.execute(`appData.commit('atm/setATMData', '${serializedData}');`)
    browser.execute(`router.push({ name: 'atm:login' })`)
    browser.setScreenState({ showChat: true, showCursor: true, showRadar: false, isBlurred: false })
  },
  'client/basic/ATM/login': (isPincodeCorrect: boolean) => {
    if (isPincodeCorrect) {
      browser.execute(`router.push({ name: 'atm:main-menu' })`)
    }
  },
  'hideCursor': () => {
    browser.setScreenState({ showChat: true, showCursor: false, showRadar: false, isBlurred: false })
  },
  'client/close-main-cef': () => {
    browser.setScreenState({ showChat: true, showCursor: false, showRadar: true, isBlurred: false })
  },
  'callServerEvent': (eventName, data) => {
    mp.events.callRemote(eventName, data)
  },
})
