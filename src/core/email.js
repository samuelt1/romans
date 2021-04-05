const config = require('config')
const nodemailer = require('nodemailer')
// const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const handlebars = require('handlebars')
const fs = require('fs')

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
// transporter.use('compile', hbs({
//   extName: '.hbs',
//   viewPath: path.join(__dirname, '/views/email/'),
//   viewEngine: {
//     layoutsDir: path.join(__dirname, '/views/layouts/'),
//     defaultLayout: 'main.hbs',
//   },
// }))

async function sendEmail (to, subject, template, context) {
  const html = await new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '/views/email/vip.hbs'), 'utf-8', function (error, source) {
      if (error) {
        throw reject(error)
      }
      const template = handlebars.compile(source)
      const compiled = template(context)
      resolve(compiled)
    })
  })

  return new Promise((resolve, reject) => {
    transporter.sendMail({
      to,
      subject,
      html,
    }, (err, responseStatus) => {
      if (err) {
        return reject(err)
      }
      return resolve(responseStatus)
    })
  })
}

module.exports = { sendEmail }
