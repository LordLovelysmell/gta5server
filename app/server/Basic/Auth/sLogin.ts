
// const misc = require('../../sMisc')
// const mailer = require('../../sMailer')
// const i18n = require('../../sI18n')
// const playerSingleton = require('../sPlayer')
import AbstractAuth from './sAuthAbstract'

class ServerLogin extends AbstractAuth {
    async login(player: PlayerMp, loginData: object) {
        player.outputChatBox(`Welcome to the server!`)
    }

}

const serverLogin = new ServerLogin()

mp.events.add({
    "playerReady": async (player) => {
        player.spawn(new mp.Vector3(3222, 5376, 20))
        player.dimension = 1001
        player.call("cLogin-ShowLoginWindow")
    },

    "sLogin-processLogin": async (player, obj) => {
        serverLogin.login(player, obj)
    },
})
