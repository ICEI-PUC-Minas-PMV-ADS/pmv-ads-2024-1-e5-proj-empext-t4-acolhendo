import { database } from '../..'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await database.galeria_imagem.deleteMany({
            where: {
                galeria_id: Number(id),
            },
        });

        await database.galeria.delete({
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
