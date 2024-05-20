import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export const postImage = async (request: Request<{}, {}>, response: Response) => {
    if (!request.files){
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Imagens não enviadas'
            },
        });
    }
    const imageDesktop = request.files['image-banner-desktop'][0].path
    const imageMobile = request.files['image-banner-mobile'][0].path


    return response.status(StatusCodes.OK).json({
        imageDesktop: imageDesktop,
        imageMobile: imageMobile
    });
};
