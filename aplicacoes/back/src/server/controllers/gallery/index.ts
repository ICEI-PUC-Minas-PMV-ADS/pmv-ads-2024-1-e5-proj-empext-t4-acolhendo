import * as Create from './Create'
import * as DeleteById from './DeleteById'
import * as GetAll from './GetAll'
import * as GetById from './GetById'
import * as UpdateById from './UpdateById'
import * as PostImage from './images/PostImage'
import * as UpdateByImageId from './images/UpdateByImageId'
import * as GetByGalleryId from './images/GetByGalleryId'
import * as DeleteByImageId from './images/DeleteByImageId'

export const GalleryController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...PostImage,
    ...UpdateByImageId,
    ...GetByGalleryId,
    ...DeleteByImageId
}
