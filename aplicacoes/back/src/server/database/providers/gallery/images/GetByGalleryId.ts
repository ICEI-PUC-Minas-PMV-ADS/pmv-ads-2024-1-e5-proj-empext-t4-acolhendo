import { IGaleriaImagem } from '../../../models';
import { database } from '../../..';

export const getByGalleryId = async (id: number, ativo: boolean = true): Promise<IGaleriaImagem[] | Error> => {
    try {
        const result = await database.galeria_imagem.findMany({
            where: {
                galeria_id: Number(id),
                ativo: ativo
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
