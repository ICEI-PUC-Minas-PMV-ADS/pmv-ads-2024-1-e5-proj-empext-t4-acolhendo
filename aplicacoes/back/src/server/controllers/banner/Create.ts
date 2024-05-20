import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { IBannerImagem } from '../../database/models';
import { BannerProvider } from '../../database/providers/banner';

interface IBodyProps extends Omit<IBannerImagem, 'id' > {}

export const createBannerValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            ativo: YUP.bool().required(),
            ordem: YUP.number().required(),
            imagem_desktop: YUP.string().required(),
            imagem_mobile: YUP.string().required(),
            descricao: YUP.string().required()
        })
    ),
}));

export const createBanner = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    if(!request.files) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Imagens não enviadas.',
            },
        });
    }
    const banner = {
        ativo: Boolean(request.body.ativo),
        ordem: Number(request.body.ordem),
        imagem_desktop: request.body.imagem_desktop,
        imagem_mobile: request.body.imagem_mobile,
        descricao: request.body.descricao
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
