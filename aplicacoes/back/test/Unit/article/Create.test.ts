import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Artigo - Create', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta criar um artigo sem autenticação', async () => {
        const output = await testServer
            .post('/api/v1/article')
            .send({
                titulo: 'Artigo de Teste 1',
                imagem_capa: 'url-para-imagem-de-capa',
                tipo: 1,
                texto: 'Texto de Teste',
                data_inclusao: '2024-04-22T21:30',
                tela_principal: true
            })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')
    })

    it('Deve criar um artigo', async () => {
        const output = await testServer
            .post('/api/v1/article')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Artigo de Teste 1',
                imagem_capa: 'url-para-imagem-de-capa',
                tipo: 1,
                texto: 'Texto de Teste TESTE TESTE TESTE TESTE',
                data_inclusao: '2024-04-22T21:30',
                tela_principal: true
            });
        expect(output.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof output.body).toEqual('object');
    });

    it('Tenta criar um artigo sem campo obrigatório', async () => {
        const output = await testServer
            .post('/api/v1/article')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Artigo de Teste 1',
                imagem_capa: 'url-para-imagem-de-capa',
                tipo: 1,
                data_inclusao: '2024-04-22T21:30',
                tela_principal: true
            });
        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(typeof output.body).toEqual('object');
    });
});