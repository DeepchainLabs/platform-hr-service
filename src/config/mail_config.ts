let mailConfig: object;

// TODO production config
if (process.env.NODE_ENV === 'production' ){
    // all emails are delivered to destination
    mailConfig = {
        host: 'smtp.elasticemail.com',
                auth: {
                    user: 'fahimdewan2k18@gmail.com',
                    pass: '4E91520A7B46B9EEF7D76549C0D889EC0612'
                }
    };
} else {
    // all emails are catched by ethereal.email
    mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ethereal.user@ethereal.email',
            pass: 'verysecret'
        }
    };
}
// let transporter = nodemailer.createTransport(mailConfig);