interface Position {
  x: number,
  y: number,
  z: number
  heading: number,
  dimension: number
}

interface ColshapePosition {
  x: number,
  y: number,
  z: number
}

interface Colshape {
  id: string,
  position: ColshapePosition,
  range: number
}

interface NPC {
  name: string,
  surname: string,
  model: string,
  position: Position,
  colshape: Colshape
}

export default function spawnNPCs(jsonString: string) {
  try {
    const localPlayer = mp.players.local
    const data = JSON.parse(jsonString)
    const NPCs: NPC[] = data.NPCs
    const peds: PedMp[] = []

    NPCs.forEach(NPC => {
      const ped = mp.peds.new(
        mp.game.joaat(NPC.model),
        new mp.Vector3(NPC.position.x, NPC.position.y, NPC.position.z),
        NPC.position.heading,
        NPC.position.dimension
      );
      ped.customData.isNPC = true
      peds.push(ped)
    })

    // setTimeout(() => {
    //   peds.forEach(ped => {
    //     ped.freezePosition(true)
    //     ped.setInvincible(true)

    //     mp.game.invoke('0x69F4BE8C8CC4796C', ped.handle, localPlayer.handle, -1, 2048, 3)
    //     mp.game.invoke(RageEnums.Natives.Audio._PLAY_AMBIENT_SPEECH1, ped.handle, 'GENERIC_HI', 'SPEECH_PARAMS_ALLOW_REPEAT')
    //   })
    // }, 5000)

    mp.events.add('entityStreamIn', (entity) => {
      mp.gui.chat.push('WTF')
      if (entity.customData.isNPC) {
        entity.freezePosition(true)
        entity.setInvincible(true)

        mp.game.invoke('0x69F4BE8C8CC4796C', entity.handle, localPlayer.handle, -1, 2048, 3)
        mp.game.invoke(RageEnums.Natives.Audio._PLAY_AMBIENT_SPEECH1, entity.handle, 'GENERIC_HI', 'SPEECH_PARAMS_ALLOW_REPEAT')
      }
    })

  } catch (err) {
    console.log(err)
  }
}
