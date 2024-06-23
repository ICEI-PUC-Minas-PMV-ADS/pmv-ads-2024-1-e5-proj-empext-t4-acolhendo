export const EmailBodyResetCode = (code: number) => {
    return `Olá, o código de reset de senha é ${code}`
}

export const EmailBodyFaleConosco = (name: string, message: string, email: string) => {
    return `Olá, ${name} entrou em contato com você, o email de contato é ${email} e a mensagem foi: ${message}`
}