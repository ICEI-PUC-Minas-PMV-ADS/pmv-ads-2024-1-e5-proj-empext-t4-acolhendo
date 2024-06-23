import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { UserProvider } from '../../database/providers/user'
import { GenerateCode } from '../../shared/services/GenerateCode'
import { ResetCodeProvider } from '../../database/providers/reset_code/'
import { Mail } from '../../shared/services/EmailSender'
import { EmailBodyResetCode } from '../../utils/EmailBody'


interface IParamsProps {
    email?: string
}

export const forgotPasswordValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        YUP.object().shape({
            email: YUP.string().required().email()
        })
    )
}))

export const forgotPassword = async (request: Request<IParamsProps>, response: Response) => {

    if (!request.params.email) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Email não informado!'
            }
        })
    }
    const user = await UserProvider.getUser(request.params.email)
    if (user instanceof Error){
        return response.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: user.message
            }
        })
    }
    const generatedCode = await GenerateCode()
    await ResetCodeProvider.saveCode(request.params.email, generatedCode)
    const message = EmailBodyResetCode(generatedCode)
    const mail = new Mail(
        request.params.email,
        message,
        'Código de Recuperação de Senha'
    )
    const sendMail = mail.sendMail()
    if ( sendMail instanceof Error){
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: sendMail.message
            }
        })
    }

    return response.status(StatusCodes.OK).json({
        verification_code: generatedCode
    })
}