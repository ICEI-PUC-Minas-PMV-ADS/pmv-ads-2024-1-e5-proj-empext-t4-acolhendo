import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { IUpdateEmpresa } from '../../database/models'
import { CompanyProvider } from '../../database/providers/company'

interface IParamProps {
    id?: number
}

interface IBodyProps extends Omit<IUpdateEmpresa, 'id'> {}

export const updateCompanyByIdValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().optional().email(),
            telefone: YUP.string().optional().min(11).max(14),
            instagram: YUP.string().optional().url(),
            facebook: YUP.string().optional().url(),
            youtube: YUP.string().optional().url(),
            chave_pix: YUP.string().optional(),
            banco: YUP.string().optional(),
            agencia: YUP.string().optional(),
            conta: YUP.string().optional(),
            cnpj: YUP.string().optional(),
            nome: YUP.string().optional()
        })
    )
}))

export const updateCompanyById = async (request: Request<IParamProps, {}, IBodyProps>,response: Response) => {
    const result = await CompanyProvider.updateById(
        request.body
    )
    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        })
    }
    return response.status(StatusCodes.ACCEPTED).send(result)
}
