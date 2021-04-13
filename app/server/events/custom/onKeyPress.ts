import Context from '@server/events/custom/strategy/Context'
import ATMStrategy from '@server/events/custom/strategy/ATMStrategy'
import NPCStrategy from '@server/events/custom/strategy/NPCStrategy'


export default function onKeyPress(player: PlayerMp) {
  try {
    const context = new Context(new ATMStrategy())

    if (!player.customData || !player.customData.currentColshape || !player.customData.currentColshape.isInteractable) return

    if (player.customData.currentColshape.type === 'ATM' && player.customData.currentColshape.isInteractable) {
      context.setStrategy(new ATMStrategy())
      context.execute(player)
    }

    if (player.customData.currentColshape.type === 'NPC' && player.customData.currentColshape.isInteractable) {
      context.setStrategy(new NPCStrategy(player.customData.NPC))
    }

  } catch (err) {
    console.error(err)
  }
}
