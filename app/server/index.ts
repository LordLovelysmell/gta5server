import { logger } from '@server/helpers/default.logger'

import EventListener from "@server/events/EventListener"

new EventListener()

// require('./Basic/Auth/sLogin')
require('./Basic/Auth/sRegister')
require('./Basic/CharacterEditor/sCharacterEditor')
require('./Basic/Vehicle/sVehicleSingletone')
require('./Basic/Banking/sATM')

logger.info('Server started.')

// mp.events.addCommand('setskin', (player, _, skin) => {
//   // @ts-ignore
//   player.model = mp.joaat(skin)
// })
