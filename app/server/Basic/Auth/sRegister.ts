import AbstractAuth from './sAuthAbstract'
const mailer = require('../../helpers/sMailer');
const misc = require('../../helpers/sMisc')

class Registration extends AbstractAuth {
  async attemptRegistration(player: PlayerMp, obj: string) {
    const data = JSON.parse(obj)
    // if (!mailer.isEmailValid(data.email)) {
    //   return this.showError(player, 'Email Invalid')
    // }
    // const d = await misc.query(`SELECT email FROM users WHERE email = '${data.email}' LIMIT 1`)
    // if (d[0]) {
    //   return this.showError(player, 'Something wrong. Try again')
    // }
    this.createAccount(player, data)
  }

  async createAccount(player: PlayerMp, d: any) {
    // const pass = this.hashPassword(d.pass)
    // await playerSingleton.createNewUser(player, d.email, d.firstName, d.lastName, pass)
    // const data = await misc.query(`SELECT id FROM users ORDER BY id DESC LIMIT 1`)
    // const q1 = moneySingleton.createNewUser(data[0].id)
    // const q2 = characterSingleton.createNewUser(data[0].id)
    // const q3 = clothesSingleton.createNewUser(data[0].id)
    // const q4 = headOverlaySingleton.createNewUser(data[0].id)
    // const q5 = faction.createNewUser(data[0].id)
    // const q6 = prison.createNewUser(data[0].id)

    // await Promise.all([q1, q2, q3, q4, q5, q6])

    // const mail = {
    //   from: `${mailer.getMailAdress()}`,
    //   to: `${d.email}`,
    //   subject: `Success registration.`,
    //   text: `Hello! Thank you for registration. Here is info about your account, in case you will forget it: Password: ${d.password1}`,
    //   html: ` <b>Hello!</b><br>
    //             Thank you for registration.<br>
    //             Here is info about your account, in case you will forget it:<br>
    //             <b>Password:</b> ${d.password1}<br>`,
    // }
    // mailer.sendMail(mail)
    player.call('cLogin-ShowLoginPage')
    player.call('cCloseCefAndDestroyCam')
  }
}

const registration = new Registration()

mp.events.add({
  'sRegister-Register': async (player, obj) => {
    registration.attemptRegistration(player, obj);
  },

});
