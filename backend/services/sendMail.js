const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

async function sendMail(options) {
    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: options.to,
        subject: options.subject,
        text: options.message
    })
}

module.exports = sendMail