import { database } from '../../../src/server/database/index'

describe('Testando banco de dados', () => {
    it('Teste de conexão com o banco', async() => {
        const output = await database.$connect()

        expect(output).toBe(undefined)
    })

    it('Deve testar se o banco está desconectado', async() => {
        const output = await database.$disconnect()

        expect(output).toBe(undefined)
    })
})