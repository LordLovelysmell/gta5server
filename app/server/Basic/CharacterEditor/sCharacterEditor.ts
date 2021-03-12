const { Character } = require('@server/models')

const data = {
  // @ts-ignore
  freemodeSkins: [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")]
}

export class CharacterEditor {

  static async saveCharacter(player: PlayerMp, jsonString: string) {
    const { gender, motherId, fatherId, skinMix, shapeMix, faceFeatures, headOverlays, componentVariations } = JSON.parse(jsonString)

    try {
      await Character.create({
        playerId: player.getVariable('guid'), // TODO: is there ways to get this with different approach ???
        gender,
        motherId,
        fatherId,
        skinMix,
        shapeMix,
        faceFeatures: JSON.stringify(faceFeatures),
        headOverlayData: JSON.stringify(headOverlays),
        componentVariationData: JSON.stringify(componentVariations),
        cash: 0,
      })

    } catch (err) {
      console.error(err)
    }
  }

  static async loadCharacter(player: PlayerMp) {
    const id = player.getVariable('guid')
    try {
      const character = await Character.findByPk(id)

      if (!character) {
        console.log('Нет данных о персонаже с playerId = ', id)
        return
      }

      const { gender, fatherId, motherId, skinMix, shapeMix } = character

      // @ts-ignore
      player.model = data.freemodeSkins[gender]

      player.setHeadBlend(
        motherId,
        fatherId,
        0,
        motherId,
        fatherId,
        0,
        shapeMix,
        skinMix,
        0)

      const { faceFeatures, headOverlayData, componentVariationData } = character // serialized data from db (as string)

      const ff = JSON.parse(faceFeatures)
      for (let i = 0; i < 20; i++) {
        player.setFaceFeature(i, parseFloat(ff[i]) || 0);
      }

      const ho = JSON.parse(headOverlayData)
      if (ho.length) {
        for (let i = 0; i < ho.length; i++) {
          player.setHeadOverlay(parseInt(ho[i].overlayId), [parseInt(ho[i].index), 1, 0, 1]);
        }
      }

      // 255 index for toggling off the overlay
      if (gender === 0) {
        player.setHeadOverlay(4, [255, 0, 0, 0]); // Makeup
        player.setHeadOverlay(8, [255, 0, 0, 0]); // Lipstick
      } else {
        player.setHeadOverlay(1, [255, 0, 0, 0]); // Facial Hair
        player.setHeadOverlay(10, [255, 0, 0, 0]); // Chest Hair
      }
      player.setHeadOverlay(5, [255, 0, 0, 0]); // Blush

      const cv = JSON.parse(componentVariationData)
      if (cv.length) {
        for (const variation of cv) {
          player.setClothes(parseInt(variation["componentId"]), parseInt(variation["drawableId"]), 0, 2)
        }
      }

      return character
    } catch (error) {
      console.error(error)
    }
  }
}
