import { database } from '../..'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await database.banner_imagem.delete({
            where: {
                id: Number(id),
            },
        });
    } catch (error) {
        return Error(error)
    } finally {
        database.$disconnect()
    }
}
