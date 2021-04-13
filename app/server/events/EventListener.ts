import { Auth } from '@server/Basic/Auth/sAuth'
import { CharacterEditor } from '@server/Basic/CharacterEditor/sCharacterEditor'
import gameconfig from '@server/config/gameconfig.json'

import playerEnterColshape from '@server/events/common/playerEnterColshape'
import playerExitColshape from '@server/events/common/playerExitColshape'
import onKeyPress from '@server/events/custom/onKeyPress'


// TODO: rename this module to EventController ???

export default class EventListener {
  constructor() {
    mp.events.add({
      'playerReady': async (player) => {
        player.spawn(new mp.Vector3(3222, 5376, 20))
        player.dimension = player.id + 2000
        player.call('client/login/init')
        player.call('client/spawnNPCs', [JSON.stringify(gameconfig)])

        this.spawnNPCColshapes()

      },
      'server/basic/auth/signIn': async (player, jsonString) => {
        Auth.signIn(player, jsonString)
      },
      'server/basic/auth/signUp': (player, jsonString) => {
        Auth.signUp(player, jsonString)
      },
      'server/basic/character-editor/save': async (player, jsonString) => {
        await CharacterEditor.saveCharacter(player, jsonString)
        player.dimension = 0;
      },
      'playerEnterColshape': playerEnterColshape,
      'playerExitColshape': playerExitColshape,
      'sKeys-E': onKeyPress,
    })
  }

  spawnNPCColshapes() {
    gameconfig.NPCs.forEach(NPC => {
      const { x, y, z } = NPC.colshape.position
      const shape = mp.colshapes.newSphere(x, y, z, NPC.colshape.range)
      shape.customData = {
        isAttachedToNPC: true,
        NPC
      }
    })
  }
}
