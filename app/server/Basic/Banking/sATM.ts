import { loadPlayerBankCard } from '@server/Basic/Banking/loadPlayerBankCard'

const { BankCard, Character, sequelize } = require('@server/models')

interface IBankCard {
  bank_account_id?: number,
  bank_card_id: number,
  balance: number,
  pin_code: number,
  is_default: boolean
}

interface IBankAccount {
  bank_account_id: number,
  cards: IBankCard[]
}

class ATM {
  constructor() {
    mp.events.add({
      'server/basic/ATM/login': async (player, stringData) => {
        try {
          const bankCard = await loadPlayerBankCard(player)
          // TODO: Implement multicard logic in future
          player.call('client/basic/ATM/login', [parseInt(bankCard.pinCode) === parseInt(JSON.parse(stringData).pin)])
        } catch (err) {
          console.error(err)
          player.notify('~r~Банкомат не работает. ~s~Пожалуйста, попробуйте позже.')
        }
      },
      'server/basic/ATM/withdraw': async (player, jsonString) => {
        try {
          const characterId = player.getVariable('guid')
          const atmData: { amount: number, type: string } = JSON.parse(jsonString)

          const bankCard = await loadPlayerBankCard(player)

          if (atmData.amount > bankCard.balance) {
            return player.notify('~r~На карте недостаточно средств.')
          }

          await sequelize.transaction(async (t: any) => {

            await BankCard.update({
              balance: bankCard.balance - atmData.amount
            }, {
              where: {
                id: bankCard.id
              },
              transaction: t
            })

            await Character.update({
              cash: bankCard.balance - atmData.amount
            }, {
              where: {
                id: characterId
              },
              transaction: t
            })

          })

          // TODO: call client-side event to display player current cash
          // player.setVariable('cash', playerCash + Number(atmData.amount))
        } catch (err) {
          console.error(err)
          return player.call('client/basic/ATM/error')
        }
      },
      'server/basic/ATM/deposit': async (player, jsonString) => {
        // const { cash } = await Character.findByPk(characterId)
        // if (Number(atmData.amount) > playerCash) {
        //   return player.notify('~r~У вас нет столько наличных.')
        // }
        // const playerBankCardNewBalance = bankCard.balance + Number(atmData.amount)
        // const playerCashNewBalance = playerCash - Number(atmData.amount)

        // await miscSingleton.processTransactionQuery(
        //   ['UPDATE bank_card SET balance = ? WHERE bank_card_id = ?', 'UPDATE `character` SET cash = ? WHERE character_id = ?'],
        //   [[playerBankCardNewBalance, bankCard.bank_card_id], [playerCashNewBalance, characterId]]
        // )

        // const updatedBankAccount = this.updateBankAccount(playerBankCardNewBalance)

        // const updatedDefaultBankCard = Object.assign({}, defaultBankCard, { balance: playerBankCardNewBalance })

        // player.setVariable('bankAccount', this.generateBankAccountObject({ bank_account_id: bankAccount.bank_account_id, cards:  }))
        // player.setVariable('cash', playerCashNewBalance)
      }
    })
  }

  generateBankAccountObject(bankAccount: IBankCard): IBankAccount {
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
    shape.customData = Object.assign({}, shape.customData, { isAttachedToATM: true })
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
