import { IEmpresa } from '../../models'
import { database } from '../..'

export const getData = async (): Promise<IEmpresa | Error> => {
    try {
        const result = await database.empresa.findFirst()
        if (!result) {
            return new Error('Registro não encontrado')
        }
        return result
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
