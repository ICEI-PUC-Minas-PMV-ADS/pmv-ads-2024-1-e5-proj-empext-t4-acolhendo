import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Gallery - Update', () => {
    let accessToken = '';
    beforeAll(async () => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });

        accessToken = signInResponse.body.accessToken;
    });

    it('Tenta atualizar um registro de Gallery sem autenticação', async () => {
        const output = await testServer
            .put('/api/v1/gallery/1')
            .send({ tela_principal: false });

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(typeof output.body).toEqual('object');
    });

    it('Atualiza registro de Gallery', async () => {
        const output = await testServer
            .put('/api/v1/gallery/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ tela_principal: false  });

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED);
    });
});
