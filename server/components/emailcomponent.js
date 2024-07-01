
const nodemailer = require("nodemailer");
class emailcomponent {
    async sendSMTPMail(from,to,subject,htmlContent, attachments) {
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {rejectUnAuthorized: true}
        });
        await transport.verify((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Ready to Send");
            }
        });

        const mail = {
            from: from,
            to:to,
            subject: subject,
            html: htmlContent,
            
        };
        await transport.sendMail(mail, (error,info) => {
            if (error) {
               console.log(error);
            } else {
               console.log("Mail Sent Successfully");
            }
        });
    }
}


module.exports = emailcomponent;