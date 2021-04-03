const config = require('config')
const nodemailer = require('nodemailer')
const defaultTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
})

function sendEmail (to, subject, text) {
  return new Promise((resolve, reject) => {
    defaultTransport.sendMail({
      to: to,
      subject: subject,
      text: text,
    }, (err, responseStatus) => {
      if (err) {
        return reject(err)
      }
      return resolve(responseStatus.message)
    })
  })
}

module.exports = { sendEmail }
