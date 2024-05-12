import { IGaleria } from '../../models';
import { database } from '../..';

export const create = async (gallery: Omit<IGaleria, 'id'>): Promise<Object | Error> => {
    try {
        return await database.galeria.create({
            data: gallery,
        });
    } catch (error) {
        return new Error('Error ao cadastrar o registro');
    } finally {
        await database.$disconnect();
    }
};
