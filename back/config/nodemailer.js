const nodemailer = require('nodemailer')
const keys = require('../config/keys')

// module.exports = nodemailer.createTransport({
//             service: keys.nodemailer.service,
//             auth: {
//                 user: keys.nodemailer.auth.user,
//                 pass: keys.nodemailer.auth.pass
//             }
//         })


module.exports = (res, email, type, context='') =>{
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            service: keys.nodemailer.service,
            auth: {
                user: keys.nodemailer.auth.user,
                pass: keys.nodemailer.auth.pass
            }
        })

        // setup email data with unicode symbols
        const mailPassResetOptions = {
            from: keys.nodemailer.from,
            to: keys.nodemailer.to, //place EMAIL parameter here
            subject: keys.nodemailer.subject,
            html: `${keys.nodemailer.html.before} ${context} ${keys.nodemailer.html.after}`
        }

        const mailContactUsOptions = {
            from: keys.nodemailer.from,
            to: keys.nodemailer.to, //place EMAIL parameter here
            subject: keys.nodemailer.contactUsSubject,
            html: keys.nodemailer.contactUsHtml
        }

        const mailToSupport = {
            from: keys.nodemailer.from,
            to: keys.nodemailer.to, //place EMAIL parameter here
            subject: keys.nodemailer.mailToSupportSubject,
            html:`U have an unread message: ${context}. 
                From: ${email}`
        }

        const mailPurchase = {
            from: keys.nodemailer.from,
            to: keys.nodemailer.to, //place EMAIL parameter here
            subject: keys.nodemailer.mailPurchaseSubject,
            html:`U have purchased ${context.project_name}. Here is a link to your purchase document: ${context.link}`
        }

        // send mail with defined transport object
        switch (type){
            case `password_reset`:
                mailOptions=mailPassResetOptions
                break
            case `mail_to_support`:
                mailOptions=mailToSupport
                break
            case `mail_contact_us`:
                mailOptions=mailContactUsOptions
                break
            case `mail_purchase`:
                mailOptions=mailPurchase
                break
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log({success: false, message: `error while sending email - ${error}`})
            }
           return console.log({success: true, message: `Email sent to ${email}`})
        })
    })
}


