import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { BannerProvider } from '../../database/providers/banner';

interface IQueryProps {
    filter?: string;
}

export const getTelaPrincipalArticleValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(YUP.object().shape({
        filter: YUP.string().optional(),
    }))
}));

export const getTelaPrincipalBanner = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {

    const where: any = {
        ativo: true
    };

    const result = await BannerProvider.getAll(null, null, where);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    }

    return response.status(StatusCodes.OK).json(result)
}
