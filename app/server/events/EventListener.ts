import { Auth } from '@server/Basic/Auth/sAuth'
import { CharacterEditor } from "@server/Basic/CharacterEditor/sCharacterEditor"

// TODO: rename this module to EventController ???

export default class EventListener {
  constructor() {
    mp.events.add({
      "playerReady": async (player) => {
        player.spawn(new mp.Vector3(3222, 5376, 20))
        player.dimension = player.id + 2000
        player.call("client/login/init")
      },
      "server/basic/auth/signIn": async (player, jsonString) => {
        Auth.signIn(player, jsonString)
      },
      'server/basic/auth/signUp': (player, jsonString) => {
        Auth.signUp(player, jsonString)
      },
      "server/basic/character-editor/save": async (player, jsonString) => {
        await CharacterEditor.saveCharacter(player, jsonString)
        player.dimension = 0;
      }
    })
  }
}
