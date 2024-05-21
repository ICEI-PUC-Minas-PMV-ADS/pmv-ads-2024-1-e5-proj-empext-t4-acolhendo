import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../../shared/middleware/Validator';
import { GalleryProvider } from '../../../database/providers/gallery';
import { IUpdateGaleriaImagem } from '../../../database/models';

interface IParamProps {
    path?: number;
}

interface IBodyProps extends Omit<IUpdateGaleriaImagem, 'id'> {}

export const updateByImagePathValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            galeria_id: YUP.number().optional(),
            ativo: YUP.bool().optional(),
            descricao: YUP.string().optional()
        })
    ),
    params: getSchema<IParamProps>(
        YUP.object().shape({
            path: YUP.number().integer().required().moreThan(0),
        })
    )
}));

export const updateByImagePath = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    const result = await GalleryProvider.updateByImageId(+request.params.path, request.body);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.ACCEPTED).send();
};
