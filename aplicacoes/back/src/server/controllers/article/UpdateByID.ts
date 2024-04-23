import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { ArticleProvider } from '../../database/providers/article';
import { IUpdateArtigo } from '../../database/models';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUpdateArtigo, 'id'> { }

export const updateArticleByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        titulo: yup.string().optional().min(5),
        imagem_capa: yup.string().optional(),
        tipo: yup.number().moreThan(0).max(4).optional(),
        texto: yup.string().min(20).optional(),
        data_inclusao: yup.date().optional()
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));


export const updateArticleById = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {

    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await ArticleProvider.updateById(+request.params.id, request.body);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return response.status(StatusCodes.ACCEPTED).send()
}

