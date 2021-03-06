import { miscSingleton } from '@server/helpers/sMisc'
import { characterEditor } from '../CharacterEditor/sCharacterEditor'
import { Auth } from "@server/models/auth"

const bcrypt = require('bcrypt')

export class Login {
  static async login(player: PlayerMp, loginData: string) {
    const { login, password } = JSON.parse(loginData)
    const escapedLogin = miscSingleton.escape(login)

    const user = await Auth.fetchUserByLogin(escapedLogin)

    console.log(user)

    if (!user) {
      player.call("cLogin-sendAuthResponse", ["Данный аккаунт не существует."])
      return
    }

    const { id, position } = user

    bcrypt.compare(password, user.password, async function (err: any, isSamePassword: boolean) {
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
