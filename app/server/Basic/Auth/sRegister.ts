const misc = require('../../helpers/sMisc')

class Registration {
  async attemptRegistration(player: PlayerMp, obj: string) {
    const data = JSON.parse(obj)
    this.createAccount(player, data)
  }

  async createAccount(player: PlayerMp, d: any) {
    console.log('createAccount method, player:', player)

    const { login, password } = d

    console.log(login, password)

    const firstSpawn = {
      x: -164,
      y: 6426,
      z: 32,
      rot: 48,
      dim: 0,
    }

    const regdate = misc.convertDateToMYSQLFormat(new Date())

    await misc.query(`INSERT INTO players 
    (login, password, ip, regdate, position, socialclub) VALUES 
    ('${login}', '${password}', '${player.ip}', '${regdate}', '${JSON.stringify(firstSpawn)}', '${player.socialClub}')`);

    misc.log.debug(`New Account: ${login} | ${regdate}`)

    const coords = misc.getPlayerCoordJSON(player)
    player.spawn(new mp.Vector3(coords.x, coords.y, coords.z))

    player.call('cCloseCefAndDestroyCam')
  }
}

const registration = new Registration()

mp.events.add({
  'sRegister-Register': (player, obj) => {
    registration.attemptRegistration(player, obj)
  },

})
