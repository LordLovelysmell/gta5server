export default function playerEnterColshape(player: PlayerMp, colshape: ColshapeMp) {
  if (colshape.customData.isAttachedToNPC && !Boolean(player.vehicle)) {
    player.customData = Object.assign({}, player.customData, { currentColshape: { type: 'NPC', NPCData: colshape.customData.NPC, isInteractable: true } })
    player.notify('Нажмите ~b~E~s~, чтобы начать диалог')
  }

  if (colshape.customData.isAttachedToATM && !player.vehicle) {
    player.customData = Object.assign({}, player.customData, { currentColshape: { type: 'ATM', isInteractable: true } })
    player.notify('Нажмите ~b~E~s~, чтобы вставить карту в банкомат')
  }
}
