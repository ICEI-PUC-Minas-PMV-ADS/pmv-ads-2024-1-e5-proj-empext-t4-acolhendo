import { IGaleriaImagem } from '../../../models';
import { database } from '../../..';

export const getByGalleryId = async (page?: number, limit?: number, id?: number): Promise<IGaleriaImagem[] | Error> => {
    try {

        page = Number(page)
        limit = Number(limit)
        const skip = Math.floor(page * limit)

        const result = await database.galeria_imagem.findMany({
            skip: skip,
            take: limit,
            where: {
                galeria_id: Number(id)
            },
        });

        if (!result) {
            return new Error('Registro não encontrado');
        }

        return result;
    } catch (error) {
        return new Error('Erro ao buscar registro');
    } finally {
        await database.$disconnect();
    }
};
