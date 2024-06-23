export const EmailBodyResetCode = (code: number) => {
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de Senha</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
        }
        table {
            border-collapse: collapse;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .email-header h1 {
            color: #4a90e2;
            font-size: 24px;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0e0e0;
        }
        .email-body {
            margin-bottom: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body p {
            margin: 0 0 10px;
            font-size: 16px;
        }
        .verification-code {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: #ffffff;
            border-radius: 5px;
            font-size: 28px;
            margin-top: 10px;
            text-align: center;
        }
        .email-footer {
            text-align: center;
            color: #777777;
            font-size: 14px;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
        }
        .email-footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table class="email-container" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="email-header">
                            <h1>Redefinição de Senha</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-body">
                            <p>Olá,</p>
                            <p>Recebemos uma solicitação para redefinir a senha da sua conta. Se você não fez essa solicitação, por favor, ignore este e-mail.</p>
                            <p>Seu código de verificação para redefinição de senha é:</p>
                            <div class="verification-code">${code}</div>
                            <br><br>
                            <p>Atenciosamente,</p>
                            <p>Acolhendo</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-footer">
                            <p>Este é um e-mail automático, por favor não responda.</p>
                            <p>&copy; 2024 Acolhendo. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </body>`

}

export const EmailBodyFaleConosco = (name: string, message: string, email: string) => {
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensagem de Contato</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
        }
        table {
            border-collapse: collapse;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .email-header h1 {
            color: #4a90e2;
            font-size: 24px;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0e0e0;
        }
        .email-body {
            margin-bottom: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body p {
            margin: 0 0 10px;
            font-size: 16px;
        }
        .email-body .message {
            background-color: #f9f9f9;
            border-left: 4px solid #4a90e2;
            padding: 15px;
            border-radius: 4px;
        }
        .email-footer {
            text-align: center;
            color: #777777;
            font-size: 14px;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
        }
        .email-footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <table width="100%" bgcolor="#f7f7f7" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table class="email-container" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="email-header">
                            <h1>Nova Mensagem de Contato</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-body">
                            <p>Você recebeu uma nova mensagem de contato:</p>
                            <p><strong>Nome:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Mensagem:</strong></p>
                            <div class="message">
                                <p>${message}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-footer">
                            <p>Este é um e-mail automático enviado a partir do fale conosco.</p>
                            <p>&copy; 2024 Acolhendo. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </body>`
}