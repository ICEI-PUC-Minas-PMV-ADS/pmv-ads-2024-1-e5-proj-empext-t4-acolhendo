import * as GetUser from './GetUser'
import * as Login from './Login'
import * as UpdatePassword from './UpdatePassword'

export const UserProvider = {
    ...GetUser,
    ...Login,
    ...UpdatePassword
}
