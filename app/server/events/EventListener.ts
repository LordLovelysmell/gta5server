import { Login } from '@server/Basic/Auth/sLogin'

export default class EventListener {
  constructor() {
    mp.events.add({
      "playerReady": async (player) => {
        player.spawn(new mp.Vector3(3222, 5376, 20))
        player.dimension = player.id + 2000
        player.call("client/login/init")
      },
      "server/login/login": async (player, obj) => {
        Login.login(player, obj)
      },
    })
  }
}
