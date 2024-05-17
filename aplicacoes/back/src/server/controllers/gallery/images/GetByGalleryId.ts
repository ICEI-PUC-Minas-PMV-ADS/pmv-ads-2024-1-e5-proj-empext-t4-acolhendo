import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../../shared/middleware/Validator';
import { GalleryProvider } from '../../../database/providers/gallery';


interface IParamProps {
    id?: number;
}

export const getByGalleryIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));

export const getByGalleryId = async (req: Request<IParamProps>, res: Response) => {
    const result = await GalleryProvider.getByGalleryId(+req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};