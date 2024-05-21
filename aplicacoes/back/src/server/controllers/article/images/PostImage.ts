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

    const image = request.files['image-article'][0].path;

    return response.status(StatusCodes.OK).json({ image });

};