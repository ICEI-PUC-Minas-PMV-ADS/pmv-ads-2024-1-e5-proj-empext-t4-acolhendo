import * as nodemailer from 'nodemailer';


export class Mail {
    constructor(
    public to: string,
    public message: string,
    ) {}

    async sendMail() {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
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
                subject: 'Código de Recuperação de Senha',
                text: this.message
            };

            await transporter.sendMail(mailOptions);
            return true
        } catch (error) {
            return new Error(error)
        }
    }
}
