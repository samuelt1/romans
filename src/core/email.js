const config = require('config')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
})
// attach the plugin to the nodemailer transporter
transporter.use('compile', hbs({
  extName: '.hbs',
  viewPath: path.join(__dirname, '/views/email/'),
  // layoutsDir: __dirname.join('/view/email'),
  // defaultLayout: 'template',
  // partialsDir: __dirname.join('/views/email/partials/'),
}))
function sendEmail (to, subject, template, context) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      to,
      subject,
      template,
      context,
    }, (err, responseStatus) => {
      if (err) {
        return reject(err)
      }
      return resolve(responseStatus)
    })
  })
}

module.exports = { sendEmail }
