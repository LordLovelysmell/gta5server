export { }

const misc = require("../../helpers/sMisc")

const data = {
  // @ts-ignore
  freemodeSkins: [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")]
}

class sCharacterEditor {
  constructor() {
    mp.events.add({
      "sCharacterEditor-saveCharacter": async (player, characterData) => {
        await this.saveCharacter(player, characterData)
      }
    })
  }

  async saveCharacter(player: PlayerMp, characterData: string) {
    const { gender, motherId, fatherId, skinMix, shapeMix, faceFeatures, headOverlays, componentVariations } = JSON.parse(characterData)

    try {
      await misc.query('INSERT INTO `character` (playerId, gender, motherId, fatherId, skinMix, shapeMix, faceFeatures, headOverlayData, componentVariationData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [player.getVariable('guid'), gender, motherId, fatherId, skinMix, shapeMix, JSON.stringify(faceFeatures), JSON.stringify(headOverlays), JSON.stringify(componentVariations)])
    } catch (err) {
      console.error(err)
    }
  }

  async loadCharacter(player: PlayerMp) {
    const id = player.getVariable('guid')
    try {
      const response = await misc.query('SELECT character_id, gender, fatherId, motherId, skinMix, shapeMix, faceFeatures, headOverlayData, componentVariationData FROM `character` WHERE playerId = ' + id + ' LIMIT 1')

      if (!response[0]) {
        console.log('Нет данных о персонаже с playerId = ', id)
        return
      }

      const { gender, fatherId, motherId, skinMix, shapeMix } = response[0]

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

      const { faceFeatures, headOverlayData, componentVariationData } = response[0] // serialized data from db (as string)

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

      return response[0]
    } catch (error) {
      misc.log.debug(`Error during loading character, loadChararcter(player: PlayerMp), ${error}`)
      console.error(error)
    }
  }
}

const characterEditor = new sCharacterEditor();
export default characterEditor;
