import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Banner - GetById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });

        accessToken = signInResponse.body.accessToken;
    });

    it('Tenta pegar todos os registro de um banner sem autenticação', async () => {
        const output = await testServer.get('/api/v1/banner/1').send();

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(output.body).toHaveProperty('errors.default');
    });

    it('Busca banner por id', async () => {
        const output = await testServer
            .get('/api/v1/banner/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('titulo');
        expect(output.body).toHaveProperty('ativo');
        expect(output.body).toHaveProperty('quantidade_exibicao');
    });
});
