import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Article - Delete By Id', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta deletar um artigo sem autenticação', async () => {
        const response = await testServer
            .delete('/api/v1/article/1')
            .send()

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(response.body).toHaveProperty('errors.default');
    })

    it('Deve apagar um artigo por id', async () => {
        const output1 = await testServer
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
        const output2 = await testServer
            .delete(`/api/v1/article/${output1.body.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send();

        expect(output2.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
});