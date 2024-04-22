import * as Login from './Login'
import * as GetUser from './GetUser'
import * as ForgotPassword from './ForgotPassword'
import * as ResetPassword from './ResetPassword'

export const UserController = {
    ...Login,
    ...GetUser,
    ...ForgotPassword,
    ...ResetPassword
}
