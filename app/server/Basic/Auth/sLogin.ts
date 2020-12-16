export { }

const bcrypt = require('bcrypt');
const misc = require("../../helpers/sMisc")
import characterEditor from '../CharacterEditor/sCharacterEditor';

class ServerLogin {
  async login(player: PlayerMp, loginData: string) {
    const { login, password } = JSON.parse(loginData)
    const escapedLogin = misc.escape(login)

    const response = await misc.query('SELECT id, login, password, position, socialclub FROM players WHERE login = ' + escapedLogin + ' LIMIT 1')

    if (!response[0]) {
      player.call("cLogin-sendAuthResponse", ["Данный аккаунт не существует."])
      return
    }

    const { id, position } = response[0]

    misc.log.debug("Start comparing the password")
    bcrypt.compare(password, response[0].password, async function (err: any, isSamePassword: boolean) {
      if (err) {
        console.error("bcrypt error - ", err)
      }
      if (isSamePassword) {
        misc.log.debug("Successfully logged in")
        player.setVariable('guid', id)

        await characterEditor.loadCharacter(player)

        const { x, y, z } = JSON.parse(position)
        player.position = new mp.Vector3(x, y, z)
        player.dimension = 0

        player.call("cLogin-destroyLoginCamera")
        player.outputChatBox("Добро пожаловать на сервер Ardent RP!")
      } else {
        player.call("cLogin-sendAuthResponse", ["Неверный пароль."])
        return
      }
    })
  }
}

const serverLogin = new ServerLogin()

mp.events.add({
  "playerReady": async (player) => {
    player.spawn(new mp.Vector3(3222, 5376, 20))
    player.dimension = player.id + 2000
    player.call("cLogin-initLogin")
  },

  "sLogin-processLogin": async (player, obj) => {
    serverLogin.login(player, obj)
  },
})
