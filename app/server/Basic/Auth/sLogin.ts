export { }

const misc = require("../../helpers/sMisc")

class ServerLogin {
  async login(player: PlayerMp, loginData: string) {
    const { login, password } = JSON.parse(loginData)
    const response = await misc.query(`SELECT id, login, password, position, socialclub FROM players WHERE login = '${login}' LIMIT 1`)

    if (!response[0]) {
      player.call("cLogin-sendAuthResponse", ["Данный аккаунт не существует."])
      return
    }
    if (response[0].password !== password) {
      player.call("cLogin-sendAuthResponse", ["Неверный пароль."])
      return
    }

    const { x, y, z } = JSON.parse(response[0].position)

    misc.log.debug(`Position: ${x}, ${y}, ${z}`)

    player.spawn(new mp.Vector3(x, y, z))

    player.call('cCloseCefAndDestroyCam')

    player.outputChatBox("Добро пожаловать на сервер Ardent RP!")
  }
}

const serverLogin = new ServerLogin()

mp.events.add({
  "playerReady": async (player) => {
    player.spawn(new mp.Vector3(3222, 5376, 20))
    player.dimension = 1001
    player.call("cLogin-ShowLoginPage")
  },

  "sLogin-processLogin": async (player, obj) => {
    serverLogin.login(player, obj)
  },
})
