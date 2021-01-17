const data = {
  freemodeSkins: [mp.game.joaat("mp_m_freemode_01"), mp.game.joaat("mp_f_freemode_01")]
}

interface CharacterData {
  gender: number,
  motherId: number,
  fatherId: number,
  shapeMix: number,
  skinMix: number,
  faceFeatures: object[],
  headOverlays: object[],
  componentVariations: object[]
}

export class cCharacterEditor {
  player: PlayerMp
  characterData: CharacterData

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
        const headOverlays = character.headOverlayData || []
        const componentVariations = character.componentVariationData || []

        this.characterData = {
          gender: character.gender,
          motherId,
          fatherId,
          shapeMix,
          skinMix,
          faceFeatures,
          headOverlays,
          componentVariations
        }

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

        if (headOverlays.length) {
          for (let i = 0; i < headOverlays.length; i++) {
            player.setHeadOverlay(Number(headOverlays[i].overlayId), Number(headOverlays[i].index), parseFloat(headOverlays[i].opacity) || 1, 3, 7);
          }
        }

        if (componentVariations.length) {
          componentVariations.forEach((variation: any) => {
            player.setComponentVariation(Number(variation.componentId), Number(variation.drawableId), 0, 0)
          })
        }

        if (character.gender === 0) {
          player.setHeadOverlay(4, 255, 0, 0, 0); // Makeup
          player.setHeadOverlay(8, 255, 0, 0, 0); // Lipstick
        } else {
          player.setHeadOverlay(1, 255, 0, 0, 0); // Facial Hair
          player.setHeadOverlay(10, 255, 0, 0, 0); // Chest Hair
        }

        player.setHeadOverlay(5, 255, 0, 0, 0); // Blush
      },
    })
  }

  prepareCharacterEditor() {
    this.player.freezePosition(true)
    this.player.position = new mp.Vector3(402.8664, -996.4108, -99.00027);
    this.player.setHeading(185.0);
    this.player.clearTasksImmediately();
    mp.game.graphics.setTimecycleModifier('default');
  }

  async saveCharacter() {
    mp.events.callRemote('sCharacterEditor-saveCharacter', JSON.stringify(this.characterData))
    this.player.position = new mp.Vector3(-164, 6426, 32);
    this.player.freezePosition(false)
  }
}
