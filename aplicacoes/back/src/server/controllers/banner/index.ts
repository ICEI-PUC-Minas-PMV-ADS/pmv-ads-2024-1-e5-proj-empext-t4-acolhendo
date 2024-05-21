import * as Create from './Create'
import * as DeleteById from './DeleteById'
import * as GetAll from './GetAll'
import * as GetById from './GetById'
import * as UpdateById from './UpdateById'
import * as PostImage from './images/PostImage'
import * as DeleteByImagePath from './images/DeleteByImagePath'


export const BannerController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...PostImage,
    ...DeleteByImagePath
}
