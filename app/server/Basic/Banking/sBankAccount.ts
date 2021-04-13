import { IBankAccount } from '@server/Basic/Banking/types/index'

const models = require('@server/models')
const { QueryTypes } = require('sequelize');

export class BankAccount {
  playerGuid: number
  bankAccount: IBankAccount

  constructor(player: PlayerMp) {
    this.playerGuid = player.getVariable('guid')
  }

  async loadBankAccount() {
    // TODO: Implement multicard logic in future
    // const result = await miscSingleton.query('SELECT * FROM `bank_card` WHERE is_default = 1 AND bank_account_id IN (SELECT bank_account_id FROM `bank_account` WHERE character_id = ?)', [this.playerGuid])

    const bankCard = await models.bankCard.query('SELECT * FROM bankcards WHERE isDefault = 1 AND bankAccountId IN (SELECT id FROM bankaccounts WHERE characterId = ?)', {
      replacements: [this.playerGuid],
      type: QueryTypes.SELECT
    })

    if (!bankCard) {
      // return player.notify('~s~У Вас отсутствует банковская карта. Откройте счет в банке или восстановите утерянную карту.')
    }

    this.bankAccount = this.constructBankAccountObject(bankCard)
  }

  constructBankAccountObject(bankAccount: any): IBankAccount {
    return {
      bank_account_id: Number(bankAccount.bank_account_id),
      cards: [
        {
          bank_card_id: Number(bankAccount.bank_card_id),
          balance: Number(bankAccount.balance),
          pin_code: Number(bankAccount.pin_code),
          is_default: Boolean(bankAccount.is_default)
        }
      ]
    }
  }
}
