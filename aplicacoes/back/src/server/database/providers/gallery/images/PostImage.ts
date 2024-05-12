import { IGaleriaImagem } from '../../../models';
import { database } from '../../..';

export const postImage = async (gallery: Omit<IGaleriaImagem, 'id'>): Promise<Object | Error> => {
    try {
        return await database.galeria_imagem.create({
            data: gallery,
        });
    } catch (error) {
        return new Error(error);
    } finally {
        await database.$disconnect();
    }
};
