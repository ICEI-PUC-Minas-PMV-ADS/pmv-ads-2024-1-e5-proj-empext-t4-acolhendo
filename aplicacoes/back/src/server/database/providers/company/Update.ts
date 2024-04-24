import { IUpdateEmpresa } from '../../models'
import { database } from '../..'

export const updateById = async (
    companyUpdateData: Omit<IUpdateEmpresa, 'id'>
): Promise<void | Error> => {
    try {
        const company = await database.empresa.findFirst()
        const result = await database.empresa.update({
            where: {
                id: company.id,
            },
            data: {
                email: companyUpdateData.email,
                telefone: companyUpdateData.telefone,
                instagram: companyUpdateData.instagram,
                facebook: companyUpdateData.facebook,
                youtube: companyUpdateData.youtube,
                chave_pix: companyUpdateData.chave_pix,
                banco: companyUpdateData.banco,
                agencia: companyUpdateData.agencia,
                conta: companyUpdateData.conta,
                cnpj: companyUpdateData.cnpj,
                nome: companyUpdateData.nome
            },
        })
        if (!result) {
            return new Error('Registro não encontrado')
        }
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        database.$disconnect()
    }
}
