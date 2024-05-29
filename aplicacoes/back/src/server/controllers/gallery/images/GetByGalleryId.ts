import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../../shared/middleware/Validator';
import { GalleryProvider } from '../../../database/providers/gallery';

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

interface IParamProps {
    gallery_id?: number;
}

export const getByGalleryIdValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        YUP.object().shape({
            page: YUP.number().optional().moreThan(0),
            limit: YUP.number().optional(),
            id: YUP.number().integer().optional().default(0),
            filter: YUP.string().optional(),
        })
    ),
    params: getSchema<IParamProps>(YUP.object().shape({
        gallery_id: YUP.number().integer().required().moreThan(0),
    }))
}));

export const getByGalleryId = async (request: Request<IParamProps, {}, {}, IQueryProps>, response: Response) => {

    const filtros: any = request.query.filter
        ? JSON.parse(request.query.filter)
        : { page: 0, limit: 10 };

    const result = await GalleryProvider.getByGalleryId(
        filtros.page,
        filtros.limit,
        +request.params.gallery_id
    );

    const count = !filtros.page ? await GalleryProvider.countImage({
        galeria_id: +request.params.gallery_id
    }) : 0;

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    } else if (count instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message },
        });
    }

    return response.status(StatusCodes.OK).json({ rows: result, count });
};