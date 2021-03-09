import { CharacterEditor } from '@server/Basic/CharacterEditor/sCharacterEditor'

const bcrypt = require('bcrypt')
const models = require('@server/models')

export class Auth {
  static async signIn(playerMp: PlayerMp, jsonString: string) {
    const { login, password } = JSON.parse(jsonString)

    const player = await models.player.findOne({ where: { login } })

    console.log(player)

    if (!player) {
      playerMp.call("client/login/response", ["Данный аккаунт не существует."])
      return
    }

    const { id, position, password: dbPassword } = player

    bcrypt.compare(password, dbPassword, async function (err: any, isSamePassword: boolean) {
      if (err) {
        console.error("bcrypt error - ", err)
      }
      if (isSamePassword) {
        playerMp.setVariable('guid', id)

        const character = await CharacterEditor.loadCharacter(playerMp)

        playerMp.setVariable('guid', character.id)

        const { x, y, z } = JSON.parse(position)
        playerMp.position = new mp.Vector3(x, y, z)
        playerMp.dimension = 0

        playerMp.call("cLogin-destroyLoginCamera")
        playerMp.outputChatBox("Добро пожаловать на сервер Ardent RP!")
      } else {
        playerMp.call("client/login/response", ["Неверный пароль."])
        return
      }
    })
  }

  static async signUp(playerMp: PlayerMp, jsonString: string) {

    const { login, password } = JSON.parse(jsonString)

    const firstSpawn = {
      x: -164,
      y: 6426,
      z: 32,
      rot: 48,
      dim: 0,
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function (err: any, hash: string) {
      try {
        const today = new Date(Date.now()).toUTCString()

        const player = await models.player.create({
          login,
          password: hash,
          ip: playerMp.ip,
          lastIp: playerMp.ip,
          regDate: today,
          lastDate: today,
          position: JSON.stringify(firstSpawn),
          socialClub: playerMp.socialClub
        })

        if (player.id) {
          playerMp.setVariable('guid', player.id)
        }

        if (err) {
          console.error(err)
        }
      } catch (err) {
        console.error(err)
      }
    });

    playerMp.call('client/character-editor/prepare')
  }
}
