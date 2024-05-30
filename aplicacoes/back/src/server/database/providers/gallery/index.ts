import * as Count from './Count'
import * as Create from './Create'
import * as DeleteById from './DeleteById'
import * as GetAll from './GetAll'
import * as GetById from './GetById'
import * as UpdateById from './UpdateById'
import * as PostImage from './images/PostImage'
import * as UpdateByImageId from './images/UpdateByImageId'
import * as GetByImageId from './images/GetByImageId'
import * as GetByGalleryId from './images/GetByGalleryId'
import * as DeleteByImageId from './images/DeleteByImageId'
import * as CountImage from './images/CountImage'

export const GalleryProvider = {
    ...Count,
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...PostImage,
    ...UpdateByImageId,
    ...GetByGalleryId,
    ...DeleteByImageId,
    ...CountImage,
    ...GetByImageId
}
