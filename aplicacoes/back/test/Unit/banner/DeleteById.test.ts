import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Banner - Delete', () => {
    let accessToken = '';
    beforeAll(async () => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });

        accessToken = signInResponse.body.accessToken;
    });

    it('Tenta deletar um banner sem autenticação', async () => {
        const response = await testServer.delete('/api/v1/banner/1').send();

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty('errors.default');
    });

    it('Deve apagar um banner por id', async () => {
        const output1 = await testServer
            .post('/api/v1/banner')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Banner Teste 1',
                ativo: true,
                quantidade_exibicao: 0
            });
        const output2 = await testServer
            .delete(`/api/v1/banner/${output1.body.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send();
        expect(output2.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
});
