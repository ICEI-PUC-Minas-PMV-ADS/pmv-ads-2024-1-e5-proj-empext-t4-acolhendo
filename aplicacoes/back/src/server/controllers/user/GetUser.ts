import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { UserProvider } from '../../database/providers/user'


interface IBodyProps {
    email?: string
}

export const getUserValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().email().required()
        })
    )
}))

export const getUser = async (request: Request<IBodyProps>, response: Response) => {
    if (!request.body.email) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Usuário não informado!'
            }
        })
    }
    const storeData = await UserProvider.getUser(request.body.email)
    if (storeData instanceof Error){
        return response.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: storeData.message
            }
        })
    }

    return response.status(StatusCodes.OK).json(storeData)
}