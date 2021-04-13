import App from '@server/core/app'
import { logger } from '@server/helpers/default.logger'
import EventListener from "@server/events/EventListener"

const { sequelize } = require('@server/models')

const app = new App()

app.listen(async () => {
  logger.info('API accessible on port 5000')
  await sequelize.authenticate().then((req: any) => {
    logger.info('Database connected')

    new EventListener()

    // require('./Basic/Auth/sRegister')
    // require('./Basic/CharacterEditor/sCharacterEditor')
    require('./Basic/Vehicle/sVehicleSingletone')
    require('./Basic/Banking/sATM')

    logger.info('All modules loaded')
  })
})


// mp.events.addCommand('setskin', (player, _, skin) => {
//   // @ts-ignore
//   player.model = mp.joaat(skin)
// })
