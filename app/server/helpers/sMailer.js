const nodemailer = require('nodemailer')

class MailerSingletone {
  constructor() {
    this.createTransport()
  }

  createTransport() {
    let testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log('EMAIL SERVER READY!');
      }
    });
  }


  getMailAdress() {
    return 'GTA 5 RP server <mail@gmail.com>';
  }

  isEmailValid(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email);
  }

  sendMail(message) {
    this.transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`);
        return process.exit(1);
      }
    });
  }

}
const mailerSingletone = new MailerSingletone();
module.exports = mailerSingletone;
