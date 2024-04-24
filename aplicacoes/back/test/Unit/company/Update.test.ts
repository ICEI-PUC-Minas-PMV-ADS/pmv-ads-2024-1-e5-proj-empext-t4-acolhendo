
import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Company - Update', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta atualizar informações sem autenticação',async ( ) => {
        const output = await testServer
            .get('/api/v1/company')
            .send({nome: 'Loja testes update'})
        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(typeof output.body).toEqual('object');
    });

    it('Deve atualizar o nome de um registro de loja', async () => {
        const output = await testServer
            .put('/api/v1/company')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ nome: 'Acolhendo Testes' })

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED)
        expect(typeof output.body).toEqual('object')
    })
})