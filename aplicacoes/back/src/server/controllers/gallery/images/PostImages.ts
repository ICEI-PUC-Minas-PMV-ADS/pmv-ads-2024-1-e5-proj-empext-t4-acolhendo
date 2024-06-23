import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../../shared/middleware/Validator';
import { IGaleriaImagem } from '../../../database/models';
import { GalleryProvider } from '../../../database/providers/gallery';

interface IBodyProps extends Omit<IGaleriaImagem, 'id' | 'imagem'> {}

export const postImageValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            galeria_id: YUP.number().required(),
            ativo: YUP.bool().optional(),
            descricao: YUP.string().optional()
        })
    ),
}));

export const postImages = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    if (!request.files){
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Imagens não enviadas'
            },
        });
    }
    const images = request.files;
    const gallery = {
        galeria_id: Number(request.body.galeria_id),
        ativo: true,
        imagem: '',
        descricao: ''
    };

    for (const image of Object.values(images)) {
        gallery.imagem = image.path
        const result = await GalleryProvider.postImage(gallery);

        if (result instanceof Error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message,
                },
            });
        }
    }

    return response.status(StatusCodes.OK).json({
        message: 'Imagens postadas com sucesso',
    });

};
