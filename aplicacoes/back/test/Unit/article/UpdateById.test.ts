import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Article - Update by id', ()=>{

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta atualizar um registro de artigo sem autenticação', async () => {
        const output = await testServer
            .put('/api/v1/article/1')
            .send({texto: 'Texto qualquere tem a aha' });

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')
    })

    it('Atualiza registro de um artigo', async () => {
        const output1 = await testServer
            .post('/api/v1/article')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Artigo de Teste 1',
                imagem_capa: 'url-para-imagem-de-capa',
                tipo: 1,
                texto: 'Texto de Teste TESTE TESTE TESTE TESTE',
                data_inclusao: '2024-04-22T21:30',
                tela_principal: false
            });
        const output2 = await testServer
            .put(`/api/v1/article/${output1.body.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Artigo de Teste 1000000000000000000000',
                imagem_capa: 'url-para-imagem-de-capa',
                tipo: 1,
                texto: 'Texto de Teste TESTE TESTE TESTE TESTE',
                data_inclusao: '2024-04-22T21:30',
                tela_principal: false
            })
        expect(output2.statusCode).toEqual(StatusCodes.ACCEPTED);
    })
})
