import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { ArticleProvider } from '../../database/providers/article';

interface IQueryProps {
    filter?: string;
}

export const getTelaPrincipalArticleValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(YUP.object().shape({
        filter: YUP.string().optional(),
    }))
}));

export const getTelaPrincipalArticle = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {

    const articleFilter = request.query.filter ? JSON.parse(request.query.filter) : null;

    const where: any = {
        tela_principal: {
            equals: true
        },
        tipo: {
            equals: Number(articleFilter.tipo)
        }
    };

    const result = await ArticleProvider.getAll(null, null, where);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    }

    return response.status(StatusCodes.OK).json(result)
}
