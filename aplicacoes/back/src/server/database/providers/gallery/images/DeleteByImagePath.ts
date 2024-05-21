import { database } from '../../..'

export const deleteByImagePath = async (path: string): Promise<void | Error> => {
    try {
        await database.galeria_imagem.deleteMany({
            where: {
                imagem: path,
            },
        });
    } catch (error) {
        return Error(error)
    } finally {
        database.$disconnect()
    }
}
