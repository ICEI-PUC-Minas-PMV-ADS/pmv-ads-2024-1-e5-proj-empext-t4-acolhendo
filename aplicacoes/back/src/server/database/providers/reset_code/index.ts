import * as Create from './Create'
import * as GetByCode from './GetByCode'
import * as UpdateCode from './UpdateCode'

export const ResetCodeProvider = {
    ...Create,
    ...GetByCode,
    ...UpdateCode
}
