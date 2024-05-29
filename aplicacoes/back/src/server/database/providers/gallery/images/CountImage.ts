import { database } from '../../..';

export const countImage = async (where: any): Promise<number | Error> => {
    try {
        const totalCount = await database.galeria_imagem.count({
            where,
        });
        if (!totalCount) {
            return new Error('Nenhum registro encontrado');
        }

        return totalCount;
    } catch (error) {
        return new Error('Erro ao buscar registros');
    } finally {
        database.$disconnect();
    }
};
