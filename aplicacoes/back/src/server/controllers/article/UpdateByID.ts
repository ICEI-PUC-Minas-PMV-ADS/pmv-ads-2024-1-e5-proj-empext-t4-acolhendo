import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { ArticleProvider } from '../../database/providers/article';
import { IUpdateArtigo } from '../../database/models';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUpdateArtigo, 'id'> { }

export const updateArticleByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(YUP.object().shape({
        titulo: YUP.string().optional().min(0),
        imagem_capa: YUP.string().optional(),
        tipo: YUP.number().moreThan(0).max(10).optional(),
        texto: YUP.string().min(0).optional(),
        data_inclusao: YUP.date().optional(),
        tela_principal: YUP.bool().optional()
    })),
    params: getSchema<IParamProps>(YUP.object().shape({
        id: YUP.number().integer().required().moreThan(0),
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

