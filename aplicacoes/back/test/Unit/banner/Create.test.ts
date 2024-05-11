import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Banner - Create', () => {
    let accessToken = '';
    beforeAll(async () => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });

        accessToken = signInResponse.body.accessToken;
    });

    it('Tenta criar um Banner sem autenticação', async () => {
        const output = await testServer.post('/api/v1/banner').send({
            titulo: 'Banner Teste 1',
            ativo: true,
            quantidade_exibicao: 0
        });

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(output.body).toHaveProperty('errors.default');
    });

    it('Deve criar um Banner', async () => {
        const output = await testServer
            .post('/api/v1/banner')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Banner Teste 1',
                ativo: true,
                quantidade_exibicao: 0
            });

        expect(output.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof output.body).toEqual('object');
    });
});
