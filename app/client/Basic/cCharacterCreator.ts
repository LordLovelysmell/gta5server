export class cCharacterCreator {
  player: PlayerMp

  constructor(player: PlayerMp) {
    this.player = player
    mp.events.add({
      'cCharacterCreator-prepareCharacterCreator': () => {
        this.prepareCharacterCreator(this.player)
      },
    })
  }

  private prepareCharacterCreator(player: PlayerMp) {
    player.freezePosition(true)
  }
}
