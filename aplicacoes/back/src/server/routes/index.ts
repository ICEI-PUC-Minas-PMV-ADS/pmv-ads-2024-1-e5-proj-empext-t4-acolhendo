import { Router } from 'express';
import { UserController, ArticleController } from '../controllers';
import { authValidator } from '../shared/middleware';

const router = Router()

// Company
router.get('/company', authValidator)            // A API deverá fornecer um endpoint GET para retornar os dados da empresa
router.put('/company', authValidator)      // A API deverá fornecer um endpoint PUT para atualizar os dados da empresa

router.get('/banner', authValidator) // A API deverá fornecer um endpoint GET para retornar todos banners
router.post('/banner', authValidator) // A API deverá fornecer um endpoint POST para criar um novo banner
router.put('/banner', authValidator) // A API deverá fornecer um endpoint PUT para atualizar o banner
router.delete('/banner/:id', authValidator) // A API deverá fornecer um endpoint DELETE para excluir um banner

router.get('/images', authValidator) // A API deverá fornecer um endpoint GET para retornar todas as imagens
router.post('/images', authValidator) // A API deverá fornecer um endpoint POST para fazer upload de uma imagem
router.delete('/images/:id', authValidator) // A API deverá fornecer um endpoint DELETE para excluir uma imagem

router.get('/gallery/:id', authValidator) // A API deverá fornecer um endpoint GET para retornar uma galeria
router.get('/gallery', authValidator) // A API deverá fornecer um endpoint GET para retornar todas as galerias
router.put('/gallery/:id', authValidator) // A API deverá fornecer um endpoint PUT para atualizar uma galeria
router.post('/gallery', authValidator) // A API deverá fornecer um endpoint POST para criar uma nova galeria
router.delete('/gallery/:id', authValidator) // A API deverá fornecer um endpoint DELETE para excluir uma galeria

// Article
router.get('/article/:id', authValidator, ArticleController.getArticleByIdValidation, ArticleController.getArticleById)             // A API deverá fornecer um endpoint GET para retornar os dados de um artigo
router.get('/article', authValidator, ArticleController.getAllArticleValidation, ArticleController.getAllArticle)                   // A API deverá fornecer um endpoint GET para retornar todos artigos
router.put('/article/:id', authValidator, ArticleController.updateArticleByIdValidation, ArticleController.updateArticleById)       // A API deverá fornecer um endpoint PUT para atualizar o artigo
router.post('/article', authValidator, ArticleController.createArticleValidation, ArticleController.createArticle)                  // A API deverá fornecer um endpoint POST para criar um novo artigo
router.delete('/article/:id', authValidator, ArticleController.deleteArticleByIdValidation, ArticleController.deleteArticleById)    // A API deverá fornecer um endpoint DELETE para excluir um artigo

// User
router.get('/user-data', authValidator, UserController.getUserValidation, UserController.getUser)                                   // A API deverá retornar os dados do usuário
router.post('/login', UserController.loginValidation, UserController.login)                                                         // A API deverá fornecer um endpoint POST para autenticar o login do usuário
router.post('/forgot-password/:email', UserController.forgotPasswordValidation, UserController.forgotPassword)                      // Rota de envio do email e geração do código verificador
router.post('/reset-password', UserController.resetPasswordValidation, UserController.resetPassword)                                // Rota de resetar a senha


export { router }