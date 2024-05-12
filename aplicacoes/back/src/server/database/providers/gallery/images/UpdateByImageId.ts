import { IUpdateGaleriaImagem } from '../../../models';
import { database } from '../../..';

export const updateByImageId = async (id: number, gallery: Omit<IUpdateGaleriaImagem, 'id'>): Promise<void | Error> => {
    try {
        const result = await database.galeria_imagem.update({
            where: {
                id: Number(id),
            },
            data: {
                ativo: gallery.ativo,
                galeria_id: gallery.galeria_id,
            },
        });

        if (!result) {
            return new Error('Registro não encontrado');
        }
    } catch (error) {
        return new Error('Erro ao buscar registro');
    } finally {
        database.$disconnect();
    }
};
