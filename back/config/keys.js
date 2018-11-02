const keys = {
    postgres: {
        client: 'pg',
        host: '127.0.0.1',
        port: 5432,
        user: 'cubex',
        password: 'cubex',
        database: 'edo',
        charset: 'utf8'
    },
    secret: '456789-735459-165756-478266',
    nodemailer: {
        service: 'gmail',
        auth: {
            user: 'perkosrakkukutsaplevich@gmail.com',
            pass: 'perkosrak9379992',
        },

        from: '"EDO" <perkosrakkukutsaplevich@gmail.com>',
        to: 'anton.holkovsky@qbex.io',
        subject: 'Password recovery(EDO)',
        contactUsSubject: 'Contact Us',
        mailToSupportSubject: 'Message from ur site!',
        mailPurchaseSubject: 'Successfully purchased',
        contactUsHtml:`U sent a message to CONTACT US. We will answer u shortly.`,
        // text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
        //         Please click on the following link, or paste this into your browser to complete the process: `,
        html: {
            before: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
                    Please click on the following link, or paste this into your browser to complete the process: `,
            after: `If you did not request this, please ignore this email and your password will remain unchanged.`
        }

    }
}

module.exports = keys