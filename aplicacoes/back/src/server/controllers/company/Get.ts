import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { CompanyProvider } from '../../database/providers/company'


interface IParamsProps {
    id?: number
}

export const getCompanyDataValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        YUP.object().shape({
            id: YUP.number().integer().optional().moreThan(0)
        })
    )
}))

export const getCompanyData = async (request: Request<IParamsProps>, response: Response) => {
    const storeData = await CompanyProvider.getData()
    if (storeData instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: storeData.message
            }
        })
    }
    return response.status(StatusCodes.OK).json(storeData)
}