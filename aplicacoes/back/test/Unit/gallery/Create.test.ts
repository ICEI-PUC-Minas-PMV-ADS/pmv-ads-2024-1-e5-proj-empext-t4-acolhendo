import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Gallery - Create', () => {
    let accessToken = '';
    beforeAll(async () => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });

        accessToken = signInResponse.body.accessToken;
    });

    it('Tenta criar uma Gallery sem autenticação', async () => {
        const output = await testServer.post('/api/v1/gallery').send({
            titulo: 'Gallery Teste 1',
            ativo: true,
            imagem_capa: 'imagem_test.jpg',
            tela_principal: true
        });

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(output.body).toHaveProperty('errors.default');
    });

    it('Deve criar uma Gallery', async () => {
        const output = await testServer
            .post('/api/v1/gallery')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Gallery Teste 1',
                ativo: true,
                imagem_capa: 'imagem_test.jpg',
                tela_principal: true
            });

        expect(output.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof output.body).toEqual('object');
    });
});
