import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { GalleryProvider } from '../../database/providers/gallery';
import ImageDeleter from '../../shared/services/ImageDeleter';



interface IParamProps {
    id?: number;
}

export const deleteGalleryByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));

export const deleteGalleryById = async (request: Request<IParamProps>, response: Response) => {
    if(!request.params.id){
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default: 'O parâmetro id precisa ser informado'
            }
        })
    }
    const gallery = await GalleryProvider.getById(request.params.id)

    if(gallery instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: gallery.message
            }
        })
    }
    try {
        await ImageDeleter.deleteImage(gallery.imagem_capa);
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao excluir a imagem capa'
            }
        });
    }

    const galleryImages = await GalleryProvider.getByGalleryId(request.params.id)
    if(galleryImages instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: galleryImages.message
            }
        })
    }
    try {
        for (const image of Object.values(galleryImages)) {
            await ImageDeleter.deleteImage(image.imagem);
        }
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao excluir as imagens'
            }
        });
    }
    const result = await GalleryProvider.deleteById(request.params.id);
    if(result instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }

    return response.status(StatusCodes.NO_CONTENT).send();
};