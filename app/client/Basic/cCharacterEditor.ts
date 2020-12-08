const data = {
  freemodeSkins: [mp.game.joaat("mp_m_freemode_01"), mp.game.joaat("mp_f_freemode_01")]
}

export class cCharacterEditor {
  player: PlayerMp

  constructor(player: PlayerMp) {
    this.player = player
    mp.events.add({
      'cCharacterEditor-updateCharacter': (character) => {
        character = JSON.parse(character)
        const motherId = Number(character.motherId) || 21
        const fatherId = Number(character.fatherId) || 0
        const shapeMix = character.shapeMix ? parseFloat(character.shapeMix) / 100 : 0.5
        const skinMix = character.skinMix ? parseFloat(character.skinMix) / 100 : 0.5
        const faceFeatures = character.faceFeatures || []
        if (this.player.model != data.freemodeSkins[character.gender]) {
          // @ts-ignore
          this.player.model = data.freemodeSkins[character.gender];
        }

        player.setHeadBlendData(
          motherId,
          fatherId,
          0,
          motherId,
          fatherId,
          0,
          shapeMix,
          skinMix,
          0,
          false)

        if (faceFeatures.length) {
          for (let i = 0; i < faceFeatures.length; i++) {
            player.setFaceFeature(i, parseFloat(faceFeatures[i]))
          }
        }
      }
    })
  }

  prepareCharacterEditor() {
    this.player.freezePosition(true)
    this.player.position = new mp.Vector3(402.8664, -996.4108, -99.00027);
    this.player.setHeading(185.0);
    this.player.clearTasksImmediately();
    mp.game.graphics.setTimecycleModifier('default');
  }
}
