import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Article - Get by id', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar todos os registro de um artigo sem autenticação', async () => {
        const output = await testServer
            .get('/api/v1/article/1')
            .send()
        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')
    })

    it('Busca artigo por id', async () => {
        const output1 = await testServer
            .post('/api/v1/article')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Artigo de Teste 1',
                imagem_capa: 'url-para-imagem-de-capa',
                tipo: 1,
                texto: 'Texto de Teste TESTE TESTE TESTE TESTE',
                data_inclusao: '2024-04-22T21:30'
            });
        const output2 = await testServer
            .get(`/api/v1/article/${output1.body.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output2.statusCode).toEqual(StatusCodes.OK);
        expect(output2.body).toHaveProperty('id');
        expect(output2.body).toHaveProperty('titulo');
        expect(output2.body).toHaveProperty('imagem_capa');
        expect(output2.body).toHaveProperty('tipo');
        expect(output2.body).toHaveProperty('texto');
        expect(output2.body).toHaveProperty('data_inclusao');
    });
});