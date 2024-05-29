import * as Create from './Create'
import * as DeleteById from './DeleteById'
import * as GetAll from './GetAll'
import * as GetById from './GetById'
import * as UpdateById from './UpdateById'
import * as PostImages from './images/PostImages'
import * as PostImage from './images/PostImage'
import * as UpdateByImagePath from './images/UpdateByImagePath'
import * as GetByGalleryId from './images/GetByGalleryId'
import * as DeleteByImagePath from './images/DeleteByImagePath'

export const GalleryController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...PostImages,
    ...PostImage,
    ...UpdateByImagePath,
    ...GetByGalleryId,
    ...DeleteByImagePath
}
