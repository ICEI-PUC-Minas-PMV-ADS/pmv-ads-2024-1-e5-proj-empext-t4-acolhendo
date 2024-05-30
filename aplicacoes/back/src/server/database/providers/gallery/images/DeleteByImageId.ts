import { database } from '../../..'

export const deleteByImageId = async (id: number): Promise<void | Error> => {
    try {
        await database.galeria_imagem.deleteMany({
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
