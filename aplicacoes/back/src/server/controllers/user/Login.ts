import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { ILogin } from '../../database/models'
import { UserProvider } from '../../database/providers/user'
import { PasswordCrypto } from '../../shared/services'
import { JWTService } from '../../shared/services'

interface IBodyProps extends ILogin{}

export const loginValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().required().email().max(150),
            senha: YUP.string().required().min(6).max(150),
        })
    ),
}))

export const login = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const { email, senha } = request.body
    const result = await UserProvider.getByEmail(email)
    if (result instanceof Error) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        })
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(
        senha,
        result.senha
    )
    if (!passwordMatch) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        })
    }

    const accessToken = JWTService.signIn({ email: result.email})
    if (accessToken === 'JWT_NOT_FOUND') {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de acesso'
            }
        })
    }
    return response.status(StatusCodes.OK).json({
        accessToken: accessToken
    })
}