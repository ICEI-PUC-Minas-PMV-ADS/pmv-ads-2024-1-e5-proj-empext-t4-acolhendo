import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Article - Get all', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar todos os registro de artigos sem autenticação', async () => {
        const output = await testServer
            .get('/api/v1/article')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')
    })

    it('Buscar todos os artigos', async () => {
        const output = await testServer
            .get('/api/v1/article')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body.count).toBeGreaterThan(0)
    })
})
