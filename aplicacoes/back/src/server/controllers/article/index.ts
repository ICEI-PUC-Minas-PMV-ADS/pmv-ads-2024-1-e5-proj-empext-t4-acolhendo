import * as Create from './Create'
import * as DeleteById from './DeleteById'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as UpdateById from './UpdateByID'
import * as TelaPrincipal from './TelaPrincipal'
import * as PostImagem from './images/PostImage'

export const ArticleController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...TelaPrincipal,
    ...PostImagem
}
