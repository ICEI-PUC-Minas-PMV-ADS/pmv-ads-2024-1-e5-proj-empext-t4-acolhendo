import { IBannerImagem } from '../../models';
import { database } from '../..';

export const getAll = async (page: number, limit: number, where?: any): Promise<IBannerImagem[] | Error> => {
    try {
        page = Number(page);
        limit = Number(limit);
        const skip = Math.floor(page * limit);
        const result = await database.banner_imagem.findMany({
            skip: skip,
            take: limit,
            where,
        });

        return result;
    } catch (error) {
        return new Error('Erro ao buscar registro');
    } finally {
        await database.$disconnect();
    }
};
