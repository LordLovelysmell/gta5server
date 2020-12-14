const misc = require('../../helpers/sMisc')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Registration {
  async attemptRegistration(player: PlayerMp, obj: string) {
    const data = JSON.parse(obj)
    this.createAccount(player, data)
  }

  async createAccount(player: PlayerMp, d: any) {

    const { login, password } = d

    const escapedData = {
      login: misc.escape(login).replace(/\'/g, ''),
      password: misc.escape(password)
    }

    const firstSpawn = {
      x: -164,
      y: 6426,
      z: 32,
      rot: 48,
      dim: 0,
    }

    bcrypt.hash(password, saltRounds, async function (err: any, hash: string) {
      try {
        const id = await misc.query('INSERT INTO players (login, password, ip, lastip, position, socialclub, regdate, lastdate) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [escapedData.login, hash, player.ip, player.ip, JSON.stringify(firstSpawn), player.socialClub])

        if (id) {
          player.setVariable('guid', id)
        }
        if (err) {
          misc.log.debug('Error during creating account')
        }
      } catch (err) {
        console.error(err)
      }
    });

    misc.log.debug(`New account created: ${login}`)

    player.call('cCharacterEditor-prepareCharacterEditor')
  }
}

const registration = new Registration()

mp.events.add({
  'sRegister-Register': (player, obj) => {
    registration.attemptRegistration(player, obj)
  },

})
