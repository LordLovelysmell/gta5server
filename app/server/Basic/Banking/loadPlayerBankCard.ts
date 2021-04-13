
const { sequelize } = require('@server/models')
const { QueryTypes } = require('sequelize')

async function loadPlayerBankCard(player: PlayerMp) {
  // TODO: Implement multicard logic in future
  const playerGuid = player.getVariable('guid')
  const bankCard = await sequelize.query('SELECT * FROM bankcards WHERE isDefault = 1 AND bankAccountId IN (SELECT id FROM bankaccounts WHERE characterId = ?)', {
    replacements: [playerGuid],
    type: QueryTypes.SELECT
  })

  return bankCard
}

export {
  loadPlayerBankCard
}
