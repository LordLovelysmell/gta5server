import { miscSingleton } from '@server/helpers/sMisc'
import { characterEditor } from '../CharacterEditor/sCharacterEditor'

const bcrypt = require('bcrypt')

class ServerLogin {
  async login(player: PlayerMp, loginData: string) {
    const { login, password } = JSON.parse(loginData)
    const escapedLogin = miscSingleton.escape(login)

    const response = await miscSingleton.query('SELECT id, login, password, position, socialclub FROM player WHERE login = ' + escapedLogin + ' LIMIT 1')

    if (!response[0]) {
      player.call("cLogin-sendAuthResponse", ["Данный аккаунт не существует."])
      return
    }

    const { id, position } = response[0]

    bcrypt.compare(password, response[0].password, async function (err: any, isSamePassword: boolean) {
      if (err) {
        console.error("bcrypt error - ", err)
      }
      if (isSamePassword) {
        player.setVariable('guid', id)

        const character = await characterEditor.loadCharacter(player)

        player.setVariable('guid', character.character_id)

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
