import { database } from '../..'


export const saveCode = async (email: string, code: number): Promise<VoidFunction | Error> => {
    try {
        const now = new Date()
        await database.reset_code.create({
            data:{
                email: email,
                reset_code: String(code),
                requested_date: now,
                expiring_date: new Date(now.getTime() + 72 * 60 * 60 * 1000),
                used: false
            }
        })

    } catch (error) {

        return Error('Error ao cadastrar o registro')
    } finally {
        await database.$disconnect()
    }
}
