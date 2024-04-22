import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { ResetCodeProvider } from '../../database/providers/reset_code'
import { UserProvider } from '../../database/providers/user'


interface IBodyProps{
    email?: string,
    code?: number,
    password?: string
}

export const resetPasswordValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().required().email(),
            code: YUP.number().required().integer().min(6),
            password: YUP.string().required().min(6).max(150),
        })
    ),
}))

export const resetPassword = async (request: Request<{}, IBodyProps>, response: Response) => {
    if (!request.body.email) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Email não informado!'
            }
        })
    }
    if (!request.body.code) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Código não informado!'
            }
        })
    }
    if (!request.body.password) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Senha não informado!'
            }
        })
    }
    const matchCode = await ResetCodeProvider.getCode(request.body.email, request.body.code)

    if (matchCode instanceof Error) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: matchCode.message
            }
        })
    }
    if (matchCode.reset_code === request.body.code) {
        await UserProvider.updatePassword(request.body.email, request.body.password)
        const updatedCode = await ResetCodeProvider.updateCode(matchCode)
        if (updatedCode instanceof Error) {
            return response.status(StatusCodes.BAD_REQUEST).json({
                errors: {
                    default: updatedCode.message
                }
            })
        }
        return response.status(StatusCodes.OK).json(
            { default: 'Senha alterada com sucesso!'}
        )
    } else {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Ocorreu um erro na troca de senha'
            }
        })
    }
}