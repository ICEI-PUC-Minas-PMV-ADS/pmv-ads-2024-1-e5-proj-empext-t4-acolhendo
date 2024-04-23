import { IUpdateArtigo } from '../../models'
import { database } from '../..'

export const updateById = async (
    id: number,
    article: Omit<IUpdateArtigo, 'id'>
): Promise<void | Error> => {
    try {
        const result = await database.artigo.update({
            where: {
                id: Number(id),
            },
            data: {
                titulo: article.titulo,
                imagem_capa: article.imagem_capa,
                tipo: article.tipo,
                texto: article.texto,
                data_inclusao: new Date(article.data_inclusao)
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
