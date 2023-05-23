const nodemailer = require('nodemailer')
require('dotenv').config()

const mailService = {
    // create connection and send email
    async sendEmail({ emailFrom, emailTo, emailSubject, emailText }) {

        // create connection
        const transporter = nodemailer.createTransport({
            // host: process.env.SMTP_HOST,
            // port: process.env.SMTP_PORT,
            // auth: {
            //     user: process.env.SMTP_USER,
            //     pass: process.env.SMTP_PASS
            // }

            host: 'smtp.ethereal.email',
            port: '587',
            auth: {
                user: 'annabell.moen2@ethereal.email',
                pass: '7QBkpsujjf5a9aQ9eN'
            }
        });

        // send email
        await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: emailSubject,
            text: emailText,
        }, (err, info) => {
            console.log({ info });
        })
    }
}






Object.freeze(mailService)

module.exports = {
    mailService,
}