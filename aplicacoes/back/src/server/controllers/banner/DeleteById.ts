import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validator';
import { BannerProvider } from '../../database/providers/banner';
import ImageDeleter from '../../shared/services/ImageDeleter';

interface IParamProps {
    id?: number;
}

export const deleteProductByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));

export const deleteProductById = async (request: Request<IParamProps>, response: Response) => {
    if(!request.params.id){
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default: 'O parâmetro id precisa ser informado'
            }
        })
    }
    const banner = await BannerProvider.getById(request.params.id)

    if(banner instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: banner.message
            }
        })
    }

    try {
        await ImageDeleter.deleteImage(banner.imagem_desktop);
        await ImageDeleter.deleteImage(banner.imagem_mobile);
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao excluir a imagem'
            }
        });
    }

    const result = await BannerProvider.deleteById(request.params.id);


    if(result instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }

    return response.status(StatusCodes.NO_CONTENT).send();
};