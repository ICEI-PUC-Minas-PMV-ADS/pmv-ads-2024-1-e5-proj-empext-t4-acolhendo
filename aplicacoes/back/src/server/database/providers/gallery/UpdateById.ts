import { IUpdateGaleria } from '../../models';
import { database } from '../..';

export const updateById = async (id: number, gallery: Omit<IUpdateGaleria, 'id'>): Promise<void | Error> => {
    try {
        const result = await database.galeria.update({
            where: {
                id: Number(id),
            },
            data: {
                titulo: gallery.titulo,
                ativo: gallery.ativo,
                imagem_capa: gallery.imagem_capa,
                tela_principal: gallery.tela_principal
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
