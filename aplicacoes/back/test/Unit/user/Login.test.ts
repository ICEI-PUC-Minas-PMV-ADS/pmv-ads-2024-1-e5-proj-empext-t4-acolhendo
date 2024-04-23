import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Usuário - Login', () => {
    it('Tenta logar com um email e senha válidos', async () => {
        const output = await testServer.post('/api/v1/login').send({
            email: 'usuario@teste.com',
            senha: 'senha123',
        });
        console.log(output)
        expect(output.statusCode).toBe(StatusCodes.OK);
        expect(output.body).toHaveProperty('accessToken');
    });
    it('Tenta logar com um email e senha inválidos', async () => {
        const output = await testServer.post('/api/v1/login').send({
            email: 'XXXXXXXXXXXXXXXXX',
            senha: 'senha1234',
        });
        expect(output.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(output.body).toHaveProperty('errors.body');
    })
});
