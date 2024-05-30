import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../../shared/middleware/Validator';
import { GalleryProvider } from '../../../database/providers/gallery';
import ImageDeleter from '../../../shared/services/ImageDeleter';

interface IParamProps {
    id?: number;
}

export const deleteByImageIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required(),
    }))
}));

export const deleteByImageId = async (request: Request<IParamProps>, response: Response) => {
    const image = await GalleryProvider.getByImageId(+request.params.id);
    const result = await GalleryProvider.deleteByImageId(+request.params.id);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    if (image instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: image.message
            }
        });
    }

    try {
        await ImageDeleter.deleteImage(image.imagem);
        return response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao excluir a imagem'
            }
        });
    }
};
