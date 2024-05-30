import { IGaleriaImagem } from '../../../models';
import { database } from '../../..';

export const getByImageId = async (id: number): Promise<IGaleriaImagem | Error> => {
    try {
        const result = await database.galeria_imagem.findUnique({
            where: {
                id: Number(id),
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
