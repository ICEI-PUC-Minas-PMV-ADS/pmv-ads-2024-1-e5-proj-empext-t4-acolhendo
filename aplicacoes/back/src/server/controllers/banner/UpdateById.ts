import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { BannerProvider } from '../../database/providers/banner';
import { IUpdateBanner } from '../../database/models';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUpdateBanner, 'id'> {}

export const updateBannerByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            ativo: YUP.bool().required(),
            ordem: YUP.number().required(),
            imagem_desktop: YUP.string().required(),
            imagem_mobile: YUP.string().required(),
            descricao: YUP.string().required()
        })
    ),
    params: getSchema<IParamProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0),
        })
    ),
}));

export const updateBannerById = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }

    const result = await BannerProvider.updateById(+request.params.id, request.body);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.ACCEPTED).send();
};
