import * as Create from './Create'
import * as DeleteById from './DeleteById'
import * as GetAll from './GetAll'
import * as GetById from './GetById'
import * as UpdateById from './UpdateById'
import * as PostImages from './images/PostImages'
import * as PostImage from './images/PostImage'
import * as UpdateByImagePath from './images/UpdateByImagePath'
import * as GetByImageId from './images/GetByImageId'
import * as GetByGalleryId from './images/GetByGalleryId'
import * as DeleteByImageId from './images/DeleteByImageId'
import * as TelaPrincipal from './TelaPrincipal'


export const GalleryController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...PostImage,
    ...UpdateByImagePath,
    ...GetByGalleryId,
    ...DeleteByImageId,
    ...PostImages,
    ...GetByImageId,
    ...TelaPrincipal
}
