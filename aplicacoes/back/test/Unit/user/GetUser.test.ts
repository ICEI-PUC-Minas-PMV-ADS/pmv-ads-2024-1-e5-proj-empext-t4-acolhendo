import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Usuario - GetUser', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta resgatar informações do usuário', async() => {
        const output = await testServer
            .get('/api/v1/user-data')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                email: 'usuario@teste.com'
            })
        console.log(output.body)
        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body).toHaveProperty('email')
        expect(output.body).toHaveProperty('senha')
    })

    it('Tenta resgatar informações do usuario não autenticado', async() => {
        const output = await testServer
            .get('/api/v1/user-data')
            .send({
                email: 'usuario@teste.com'
            })
        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default');
    })

    it('Tenta resgatar informações do usuario com email inválido', async() => {
        const output = await testServer
            .get('/api/v1/user-data')
            .send({
                email: 'usuario@teste.cocccm'
            })
        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default');
    })
})