import { IUpdateBanner } from '../../models';
import { database } from '../..';

export const updateById = async (id: number, banner: Omit<IUpdateBanner, 'id'>): Promise<void | Error> => {
    try {
        const result = await database.banner_imagem.update({
            where: {
                id: Number(id),
            },
            data: {
                ativo: banner.ativo,
                ordem: banner.ordem,
                imagem_desktop: banner.imagem_desktop,
                imagem_mobile: banner.imagem_mobile,
                descricao: banner.descricao
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
