import { Router } from 'express';
import { UserController } from '../controllers';
import { authValidator } from '../shared/middleware';

const router = Router()


// NEW
router.get('/user-data', authValidator, UserController.getUserValidation, UserController.getUser)
router.post('/login', UserController.loginValidation, UserController.login)                                                         //  A API deverá fornecer um endpoint POST para autenticar o login do usuário
router.post('/forgot-password/:email', UserController.forgotPasswordValidation, UserController.forgotPassword)                      // Rota de envio do email e geração do código verificador
router.post('/reset-password', UserController.resetPasswordValidation, UserController.resetPassword)                                // Rota de resetar a senha


export { router }