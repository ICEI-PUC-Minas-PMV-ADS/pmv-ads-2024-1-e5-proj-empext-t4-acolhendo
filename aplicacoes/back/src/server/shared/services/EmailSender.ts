import * as nodemailer from 'nodemailer';


export class Mail {
    constructor(
    public to: string,
    public message: string,
    public subject: string
    ) {}

    async sendMail() {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: this.to,
                subject: this.subject,
                html: this.message
            };
            await transporter.sendMail(mailOptions);
            return true
        } catch (error) {
            return new Error(error)
        }
    }
}
