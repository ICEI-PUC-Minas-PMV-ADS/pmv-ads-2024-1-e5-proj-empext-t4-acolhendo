import { IUsuario } from '../../models'
import { database } from '../..'

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await database.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (!result) {
            return new Error('Pessoa não encontrada')
        }

        return result
    } catch (error) {
        return new Error('Erro ao buscar pessoa')
    } finally {
        database.$disconnect()
    }
}
