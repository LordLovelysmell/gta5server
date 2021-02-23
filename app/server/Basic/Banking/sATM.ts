export { }

const misc = require('../../helpers/sMisc')

interface IBankCard {
  bank_card_id: number,
  bank_account_id: number,
  balance: number,
  pin_code: number,
  is_default: boolean
}

class ATM {
  constructor() {
    mp.events.add({
      "playerEnterColshape": (player: PlayerMp, shape: ColshapeMp) => {
        if (player.vehicle || !shape.getVariable('isATM')) return
        player.setVariable('canOpenATM', true)
        player.notify('Нажмите ~b~E~s~, чтобы вставить карту в банкомат')
      },
      "playerExitColshape": (player, shape) => {
        if (!shape.getVariable('isATM')) return
        player.setVariable('canOpenATM', false)
        player.call('hideCursor')
      },
      "sKeys-E": async (player) => {
        if (!player.getVariable('canOpenATM')) return
        let bankAccount = player.getVariable('bankAccount')
        if (!bankAccount || !bankAccount.cards || !bankAccount.cards.length) {
          bankAccount = await this.loadPlayerBankAccount(player)
          if (!bankAccount) {
            return player.notify('~s~У Вас отсутствует банковская карта. Откройте счет в банке или восстановите утерянную карту.')
          }
          // TODO: Implement multicard logic in future
          player.setVariable('bankAccount', this.generateBankAccountObject(bankAccount))
        }
        player.call('cATM-open', [JSON.stringify(bankAccount)])
      },
      'sATM-login': async (player, stringData) => {
        try {
          let bankAccount = player.getVariable('bankAccount')
          // TODO: Implement multicard logic in future
          player.call('cATM-loginProcess', [parseInt(bankAccount.cards[0].pin_code) === parseInt(JSON.parse(stringData).pin)])
        } catch (err) {
          console.error(err)
          player.notify('~r~Кажется, что банкомат не работает. ~s~Пожалуйста, попробуйте позже.')
        }
      },
      'sATM-withdrawOrDeposit': async (player, stringData) => {
        const characterId = player.getVariable('guid')
        const bankAccount = player.getVariable('bankAccount')
        const defaultBankCard = bankAccount.cards.find((bankCard: IBankCard) => bankCard.is_default)
        console.log('defaultBankCard: ', defaultBankCard)
        const result = await misc.query('SELECT cash FROM `character` WHERE character_id = ?', [characterId])
        const playerCash = Number(result[0].cash)
        const atmData: { amount: number, type: string } = JSON.parse(stringData)

        if (atmData.type === 'withdrawal') {
          if (Number(atmData.amount) > bankAccount.cards[0].balance) {
            return player.notify('~r~На карте недостаточно средств.')
          }
          const playerBankCardNewBalance = defaultBankCard.balance - Number(atmData.amount)

          await misc.query('UPDATE bank_card SET balance = ? WHERE bank_card_id = ?', [playerBankCardNewBalance, bankAccount.cards[0].bank_card_id])
          player.setVariable('cash', playerCash + Number(atmData.amount))
        }

        if (atmData.type === 'deposit') {
          if (Number(atmData.amount) > playerCash) {
            return player.notify('~r~У вас нет столько наличных.')
          }
          const playerBankCardNewBalance = defaultBankCard.balance + Number(atmData.amount)
          const playerCashNewBalance = playerCash - Number(atmData.amount)

          const response = await misc.query('BEGIN TRANSACTION; UPDATE bank_card SET balance = ? WHERE bank_card_id = ?; UPDATE character SET cash = ? WHERE character_id = ?; COMMIT;', [playerBankCardNewBalance, bankAccount.cards[0].bank_card_id, playerCashNewBalance, characterId])
          console.log(response)
          bankAccount.cards[0].balance = playerBankCardNewBalance
          player.setVariable('bankAccount', this.generateBankAccountObject(bankAccount))
          player.setVariable('cash', playerCashNewBalance)
        }
      },
    })
  }

  async loadPlayerBankAccount(player: PlayerMp) {
    // TODO: Implement multicard logic in future
    const result = await misc.query('SELECT * FROM `bank_card` WHERE is_default = 1 AND bank_account_id IN (SELECT bank_account_id FROM `bank_account` WHERE character_id = ?)', [player.getVariable('guid')])
    return result[0]
  }

  generateBankAccountObject(bankAccount: IBankCard) {
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

  createATMByCoords(x: number, y: number, z: number) {
    const shape = mp.colshapes.newSphere(x, y, z, 0.5);
    shape.setVariable('isATM', true)
    mp.blips.new(500, new mp.Vector3(x, y, z),
      {
        name: "ATM",
        color: 2,
        shortRange: true,
        scale: 0.75,
      });
  }

  loadATMs() {
    this.createATMByCoords(-95.54, 6457.14, 31.46);
    this.createATMByCoords(-97.26, 6455.38, 31.46);
    this.createATMByCoords(155.828, 6642.827, 31.602);
    this.createATMByCoords(174.161, 6637.827, 31.573);
    this.createATMByCoords(1701.28, 6426.46, 32.76);
    this.createATMByCoords(112.483, -818.976, 31.342);
    this.createATMByCoords(111.323, -775.486, 31.437);
    this.createATMByCoords(114.181, -776.757, 31.418);
    this.createATMByCoords(296.444, -893.988, 29.231);
    this.createATMByCoords(295.694, -896.069, 29.214);
    this.createATMByCoords(147.726, -1035.783, 29.343);
    this.createATMByCoords(145.947, -1035.146, 29.345);
    this.createATMByCoords(289.01, -1256.83, 29.441);
    this.createATMByCoords(1703, 4933.5, 42.06);
    this.createATMByCoords(1968.13, 3743.56, 32.34);
    this.createATMByCoords(2683, 3286.5, 55.21);
    this.createATMByCoords(-611.92, -704.75, 31.26);
    this.createATMByCoords(-614.6, -704.75, 31.26);
  }

}

const atmSingletone = new ATM();
atmSingletone.loadATMs();
