import { IArtigo } from '../../models'
import { database } from '../..'

export const create = async (article: Omit<IArtigo, 'id'>): Promise<Object | Error> => {
    try {
        return await database.artigo.create({
            data: article
        });
    } catch (error) {
        return new Error('Erro ao cadastrar o registro')
    } finally {
        await database.$disconnect()
    }
}
