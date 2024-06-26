import { IArtigo } from '../../models';
import { database } from '../..';

export const getAll = async (
    page: number,
    limit: number,
    where?: any
): Promise<IArtigo[] | Error> => {
    try {

        if (page && limit) {

            page = Number(page)
            limit = Number(limit)
            const skip = Math.floor(page * limit)
            const result = await database.artigo.findMany({
                skip: skip,
                take: limit,
                where
            })
            return result

        } else {

            const result = await database.artigo.findMany({
                where
            });

            return result;

        }

    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
