import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../../shared/middleware/Validator';
import { GalleryProvider } from '../../../database/providers/gallery';
import ImageDeleter from '../../../shared/services/ImageDeleter';

interface IParamProps {
    path?: string;
}

export const deleteByImagePathValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        path: yup.string().required(),
    }))
}));

export const deleteByImagePath = async (request: Request<IParamProps>, response: Response) => {
    if (!request.params.path) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro caminho da imagem precisa ser informado'
            }
        });
    }

    const imagePath = request.params.path;
    // const result = await GalleryProvider.deleteByImagePath(imagePath);

    // if (result instanceof Error) {
    //     return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //         errors: {
    //             default: result.message
    //         }
    //     });
    // }

    try {
        await ImageDeleter.deleteImage(imagePath);
        return response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao excluir a imagem'
            }
        });
    }
};
