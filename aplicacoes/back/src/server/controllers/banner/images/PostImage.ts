import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const postImage = async (request: Request<{}, {}>, response: Response) => {

    if (!request.files) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Imagem não enviada'
            },
        });
    }

    const image = request.files['image-banner'][0].path.split('\\front\\src\\')[1]

    return response.status(StatusCodes.OK).json({ image });

};