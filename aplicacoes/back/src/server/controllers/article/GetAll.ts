import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { ArticleProvider } from '../../database/providers/article';

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}


export const getAllArticleValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional(),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional(),
    }))
}));

export const getAllArticle = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {

    const articleFilter = request.query.filter ? JSON.parse(request.query.filter) : { page: 0, limit: 10 };

    const where: any = {};

    if (articleFilter.filter) {

        if (articleFilter.filter.status !== undefined) {
            where.status = {
                equals: articleFilter.filter.status
            }
        }

    }

    const result = await ArticleProvider.getAll(articleFilter.page, articleFilter.limit, where);

    const count = !articleFilter.page ? await ArticleProvider.count(where) : 0;

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    } else if (count instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    }

    return response.status(StatusCodes.OK).json({ rows: result, count })
}
