import { database } from '../..'
import { IResetCode } from '../../models'


export const getCode = async (email: string, reset_code: string): Promise<IResetCode | Error> => {
    try {
        const result = await database.reset_code.findFirst({
            where: {
                email: email,
                reset_code: reset_code
            },
        })
        if (!result) {
            return new Error('Registro não encontrado')
        }
        if (result.used) {
            return new Error('Código já utilizado')
        }
        return result
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
