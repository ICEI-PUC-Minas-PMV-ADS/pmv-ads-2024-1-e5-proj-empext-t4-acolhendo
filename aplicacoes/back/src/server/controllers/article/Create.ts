import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { IArtigo } from '../../database/models';
import { ArticleProvider } from '../../database/providers/article';

interface IBodyProps extends Omit<IArtigo, 'id'> { }


export const createArticleValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(YUP.object().shape({
        titulo: YUP.string().required().min(0),
        imagem_capa: YUP.string().required(),
        tipo: YUP.number().required().moreThan(0).max(10),
        texto: YUP.string().optional().min(0),
        data_inclusao: YUP.date().optional(),
        tela_principal: YUP.bool().required()
    }))
}));

export const createArticle = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const article = {
        titulo: request.body.titulo,
        imagem_capa: request.body.imagem_capa,
        tipo: request.body.tipo,
        texto: request.body.texto,
        data_inclusao: new Date(),
        tela_principal: request.body.tela_principal
    };

    const result = await ArticleProvider.create(article);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return response.status(StatusCodes.CREATED).send(result)
}