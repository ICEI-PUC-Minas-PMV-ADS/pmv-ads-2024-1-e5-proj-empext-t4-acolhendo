
import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Company - Get', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta resgatar informações sem autenticação',async ( ) => {
        const output = await testServer
            .get('/api/v1/company')
        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(typeof output.body).toEqual('object');
    })

    it('Tenta resgatar informações da empresa', async() => {
        const output = await testServer
            .get('/api/v1/company')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body).toHaveProperty('id');
        expect(output.body).toHaveProperty('nome');
        expect(output.body).toHaveProperty('email');
        expect(output.body).toHaveProperty('telefone');
        expect(output.body).toHaveProperty('instagram');
        expect(output.body).toHaveProperty('facebook');
        expect(output.body).toHaveProperty('youtube');
        expect(output.body).toHaveProperty('chave_pix');
        expect(output.body).toHaveProperty('banco');
        expect(output.body).toHaveProperty('agencia');
        expect(output.body).toHaveProperty('conta');
        expect(output.body).toHaveProperty('cnpj');
    })
})
