import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { GalleryProvider } from '../../database/providers/gallery';

interface IQueryProps {
    filter?: string;
}

export const getTelaPrincipalGalleryValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(YUP.object().shape({
        filter: YUP.string().optional(),
    }))
}));

export const getTelaPrincipalGallery = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {

    const galleryFilter = request.query.filter ? JSON.parse(request.query.filter) : null;

    const where: any = {
        tela_principal: {
            equals: true
        }
    };

    const result = await GalleryProvider.getAll(null, null, where);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    }

    return response.status(StatusCodes.OK).json(result)
}
