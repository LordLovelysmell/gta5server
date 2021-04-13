import Strategy from '@server/events/custom/strategy/Strategy'
import { loadPlayerBankCard } from '@server/Basic/Banking/loadPlayerBankCard'

export default class ATMStrategy implements Strategy {
  public async execute(player: PlayerMp) {
    try {
      const bankCard = await loadPlayerBankCard(player)
      const notification = {
        type: 'Info',
        message: 'У Вас отсутствует банковская карта. Откройте счет в банке или восстановите утерянную карту'
      }
      if (!bankCard || !bankCard.length) {
        player.notify('~s~У Вас отсутствует банковская карта')
        player.call('client/notification', [JSON.stringify(notification)])
        return
      }
      // TODO: Implement multicard logic in future
      player.call('client/basic/ATM/open', [JSON.stringify(bankCard)])
      return bankCard
    } catch (err) {
      console.error(err)
    }
  }
}
