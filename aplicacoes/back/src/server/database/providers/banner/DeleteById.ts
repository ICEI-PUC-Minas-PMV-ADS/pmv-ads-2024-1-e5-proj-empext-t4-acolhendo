import { database } from '../..'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await database.banner_imagem.deleteMany({
            where: {
                banner_id: Number(id),
            },
        });

        await database.banner.delete({
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
