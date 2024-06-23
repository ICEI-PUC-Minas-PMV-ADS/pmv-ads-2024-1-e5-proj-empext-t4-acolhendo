import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { GalleryProvider } from '../../database/providers/gallery';
import { IUpdateGaleria } from '../../database/models';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUpdateGaleria, 'id'> {}

export const updateGalleryByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            titulo: YUP.string().optional().min(5),
            ativo: YUP.bool().optional(),
            imagem_capa: YUP.string().optional(),
            tela_principal: YUP.bool().optional()
        })
    ),
    params: getSchema<IParamProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0),
        })
    ),
}));

export const updateGalleryById = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }

    const result = await GalleryProvider.updateById(+request.params.id, request.body);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.ACCEPTED).send();
};
