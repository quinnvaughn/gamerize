const crypto = require('crypto')
const nodemailer = require('nodemailer')
const dateFns = require('date-fns')
require('dotenv').config()

const email = {
  async sendForgotPasswordEmail(parent, { input }, { prisma }) {
    const user = await prisma.user({ email: input.email })
    if (!user) {
      return {
        error: 'The requested email is not in the database.',
      }
    } else {
      const token = crypto.randomBytes(20).toString('hex')
      await prisma.updateUser({
        where: { email: input.email },
        data: {
          resetPasswordToken: token,
          resetPasswordExpires: dateFns.format(Date.now() + 3600000),
        },
      })
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.RESET_PASSWORD_EMAIL}`,
          pass: `${process.env.RESET_PASSWORD_PASSWORD}`,
        },
      })

      const mailOptions = {
        from: '"Gamerize" info@gamerize.io',
        to: `${input.email}`,
        subject: 'Link To Reset Password',
        text:
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
          `${process.env.RESET_PASSWORD_URL}/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchaged.\n`,
      }
      const response = await transporter.sendMail(mailOptions)
      if (response.accepted.length > 0) {
        return {
          sent: true,
        }
      } else {
        return {
          error: 'The email was not sent. Please try again.',
        }
      }
    }
  },
}

module.exports = { email }
