import { IBannerImagem } from '../../models';
import { database } from '../..';

export const create = async (banner: Omit<IBannerImagem, 'id'>): Promise<Object | Error> => {
    try {
        return await database.banner_imagem.create({
            data: banner,
        });
    } catch (error) {
        return new Error('Error ao cadastrar o registro');
    } finally {
        await database.$disconnect();
    }
};
