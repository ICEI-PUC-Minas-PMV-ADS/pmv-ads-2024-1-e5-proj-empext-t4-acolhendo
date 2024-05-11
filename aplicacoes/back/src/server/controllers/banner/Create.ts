import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { IBanner } from '../../database/models';
import { BannerProvider } from '../../database/providers/banner';

interface IBodyProps extends Omit<IBanner, 'id'> {}

export const createBannerValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            titulo: YUP.string().required().min(5),
            ativo: YUP.bool().required(),
            quantidade_exibicao: YUP.number().required()
        })
    ),
}));

export const createBanner = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const banner = {
        titulo: request.body.titulo,
        ativo: request.body.ativo,
        quantidade_exibicao: request.body.quantidade_exibicao,
    };

    const result = await BannerProvider.create(banner);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.CREATED).send(result);
};
