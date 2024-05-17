import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { IGaleria } from '../../database/models';
import { GalleryProvider } from '../../database/providers/gallery';

interface IBodyProps extends Omit<IGaleria, 'id'> {}

export const createGalleryValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            titulo: YUP.string().required().min(0),
            ativo: YUP.bool().required(),
            imagem_capa: YUP.string().required(),
            tela_principal: YUP.bool().required()
        })
    ),
}));

export const createGallery = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const gallery = {
        titulo: request.body.titulo,
        ativo: request.body.ativo,
        imagem_capa: request.body.imagem_capa,
        tela_principal: request.body.tela_principal
    };

    const result = await GalleryProvider.create(gallery);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.CREATED).send(result);
};
