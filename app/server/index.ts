require('./Basic/Auth/sLogin')
require('./Basic/Auth/sRegister')
require('./Basic/Vehicle/sVehicleSingletone')


mp.events.addCommand('setskin', (player, _, skin) => {
  // @ts-ignore
  player.model = mp.joaat(skin)
})
