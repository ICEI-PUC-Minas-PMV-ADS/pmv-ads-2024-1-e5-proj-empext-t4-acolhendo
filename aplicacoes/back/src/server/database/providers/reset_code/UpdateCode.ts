import { database } from '../..'
import { IResetCode } from '../../models'


export const updateCode = async (code: IResetCode) => {
    try {

        await database.reset_code.update({
            where: {
                id: code.id,
            },
            data: {
                expiring_date: new Date(),
                used: true,
            }
        })
    } catch (error) {
        return new Error('Erro ao atualizar registro')
    }
}