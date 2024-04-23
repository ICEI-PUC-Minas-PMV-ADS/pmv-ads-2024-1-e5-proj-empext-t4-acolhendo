import { database } from '../..'

export const count = async (where: any): Promise<number | Error> => {
    try {

        const totalCount = await database.artigo.count({
            where
        })
        if (!totalCount) {
            return new Error('Nenhum registro encontrado')
        }

        return totalCount
    } catch (error) {
        return new Error('Erro ao buscar registros')
    } finally {
        database.$disconnect()
    }
}
