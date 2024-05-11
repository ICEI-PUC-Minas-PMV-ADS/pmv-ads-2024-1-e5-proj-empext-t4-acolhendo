import { IUpdateBanner } from '../../models';
import { database } from '../..';

export const updateById = async (id: number, banner: Omit<IUpdateBanner, 'id'>): Promise<void | Error> => {
    try {
        const result = await database.banner.update({
            where: {
                id: Number(id),
            },
            data: {
                titulo: banner.titulo,
                ativo: banner.ativo,
                quantidade_exibicao: banner.quantidade_exibicao,
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
