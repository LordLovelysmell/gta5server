require('./Basic/Auth/sLogin')
require('./Basic/Auth/sRegister')
require('./Basic/CharacterEditor/sCharacterEditor')
require('./Basic/Vehicle/sVehicleSingletone')
require('./Basic/Banking/sATM')


mp.events.addCommand('setskin', (player, _, skin) => {
  // @ts-ignore
  player.model = mp.joaat(skin)
})
