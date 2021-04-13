export default function playerExitColshape(player: PlayerMp, colshape: ColshapeMp) {
  player.customData = Object.assign({}, player.customData, { currentColshape: { type: '', NPCData: null, isInteractable: false } })
  player.call('hideCursor')
  player.call('client/close-main-cef')
}
