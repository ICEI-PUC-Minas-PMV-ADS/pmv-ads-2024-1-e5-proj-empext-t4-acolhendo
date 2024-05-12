import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Gallery - Delete', () => {
    let accessToken = '';
    beforeAll(async () => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });

        accessToken = signInResponse.body.accessToken;
    });

    it('Tenta deletar uma Gallery sem autenticação', async () => {
        const response = await testServer.delete('/api/v1/gallery/1').send();

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty('errors.default');
    });

    it('Deve apagar uma Gallery por id', async () => {
        const output1 = await testServer
            .post('/api/v1/gallery')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                titulo: 'Gallery Teste Delete',
                ativo: true,
                imagem_capa: 'imagem_test.jpg',
                tela_principal: true
            });
        const output2 = await testServer
            .delete(`/api/v1/gallery/${output1.body.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send();
        expect(output2.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
});
