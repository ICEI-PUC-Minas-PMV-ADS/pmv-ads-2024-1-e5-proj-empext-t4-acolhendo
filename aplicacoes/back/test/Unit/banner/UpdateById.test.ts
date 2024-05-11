import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Banner - Update', () => {
    let accessToken = '';
    beforeAll(async () => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });

        accessToken = signInResponse.body.accessToken;
    });

    it('Tenta atualizar um registro de banner sem autenticação', async () => {
        const output = await testServer
            .put('/api/v1/banner/1')
            .send({ quantidade_exibicao: 4 });

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(typeof output.body).toEqual('object');
    });

    it('Atualiza registro de banner', async () => {
        const output = await testServer
            .put('/api/v1/banner/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ quantidade_exibicao: 4 });

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED);
    });
});
