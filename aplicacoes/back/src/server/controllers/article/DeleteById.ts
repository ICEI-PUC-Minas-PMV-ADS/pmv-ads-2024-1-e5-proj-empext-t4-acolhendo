import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { ArticleProvider } from '../../database/providers/article';


interface IParamProps {
    id?: number;
}


export const deleteArticleByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(YUP.object().shape({
        id: YUP.number().integer().required().moreThan(0),
    }))
}));

export const deleteArticleById = async (request: Request<IParamProps>, response: Response) => {

    if(!request.params.id){
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default: 'O parâmetro id precisa ser informado'
            }
        })
    }

    const result = await ArticleProvider.deleteById(request.params.id)

    if(result instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }

    return response.status(StatusCodes.NO_CONTENT).send()
}