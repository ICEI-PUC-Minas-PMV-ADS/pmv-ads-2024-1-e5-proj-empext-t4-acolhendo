import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { BannerProvider } from '../../database/providers/banner';

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllBannerValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        YUP.object().shape({
            page: YUP.number().optional().moreThan(0),
            limit: YUP.number().optional(),
            id: YUP.number().integer().optional().default(0),
            filter: YUP.string().optional(),
        })
    ),
}));

export const getAllBanner = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {
    const filtros: any = request.query.filter
        ? JSON.parse(request.query.filter)
        : { page: 0, limit: 10 };

    const where: any = {};

    if (filtros.filter) {
        if (filtros.filter.ativo !== undefined) {
            where.ativo = {
                equals: filtros.filter.ativo,
            };
        }
    }

    const result = await BannerProvider.getAll(
        filtros.page,
        filtros.limit,
        where
    );

    const count = !filtros.page ? await BannerProvider.count(where) : 0;

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message },
        });
    } else if (count instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message },
        });
    }

    return response.status(StatusCodes.OK).json({ rows: result, count });
};
