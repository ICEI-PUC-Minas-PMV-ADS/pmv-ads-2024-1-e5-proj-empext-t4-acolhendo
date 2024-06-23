import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { Mail } from '../../shared/services/EmailSender'
import { EmailBodyFaleConosco } from '../../utils/EmailBody'


interface IBodyProps {
    name?: string
    email?: string
    message?: string
}


export const postMessageValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            name: YUP.string().required(),
            email: YUP.string().required().email(),
            message: YUP.string().required()
        })
    )
}))

export const postMessage = async (request: Request<IBodyProps>, response: Response) => {
    if (!request.body.email) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Email não informado!'
            }
        })
    }
    const message = EmailBodyFaleConosco(request.body.name, request.body.message, request.body.email)
    const mail = new Mail(
        process.env.EMAIL_USER,
        message,
        `${request.body.name} deseja falar com vocês`
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
        text: 'Email enviado com sucesso'
    })
}
