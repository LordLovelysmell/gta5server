export { }

const misc = require('../../helpers/sMisc')

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
        if (!player.getVariable('canOpenATM')) return;
        await this.loadPlayerBankAccountInfo(player);
      },
      'sATM-topUp': async (player, topUp) => {
        try {
          const characterId = player.getVariable('guid')
          const result = await misc.query('SELECT cash, bank_card_id, balance FROM `character` LEFT JOIN bank_card ON character.character_id = ?', [characterId])

          if (!result[0]) {
            player.notify('~r~Кажется, что банкомат не работает. ~s~Пожалуйста, попробуйте позже.')
            return
          }

          topUp = parseInt(topUp)

          const { cash, balance, bank_card_id } = result[0]

          if (topUp > parseInt(cash)) {
            player.notify('~r~У вас нет столько наличных.')
            return
          }

          const newBalance = topUp + parseInt(balance)
          const newCash = parseInt(cash) - topUp

          const update = await misc.query('UPDATE bank_card bc, `character` c SET bc.balance = ?, c.cash = ? WHERE bc.bank_card_id = ? AND c.character_id = ?', [newBalance, newCash, bank_card_id, characterId])
          console.log(update)
          misc.log.debug(`Character [${characterId}] updated cash from ${cash} to ${newCash} and card balance from ${balance} to ${newBalance}`)
        } catch (err) {
          console.error(err)
          player.notify('~r~Кажется, что банкомат не работает. ~s~Пожалуйста, попробуйте позже.')
        }

      }
    })
  }

  async loadPlayerBankAccountInfo(player: PlayerMp) {
    const result = await misc.query('SELECT * FROM bank_account LEFT JOIN bank_card ON bank_account.character_id = ?', [player.getVariable('guid')])
    if (!result[0]) {
      player.notify('~r~Похоже, что Вас отсутствует банковская карта. ~s~Откройте счет в банке или восстановите утерянную карту.')
      return
    }
    player.call('cATM-open', [JSON.stringify(result[0])])
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
