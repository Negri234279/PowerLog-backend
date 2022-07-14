import uuid from 'uuid-random'

const randomEmail = () => `test${Math.floor(Math.random() * 99999)}@test.com`

export const randomUser = () => {
    return {
        'id': uuid(),
        'email': randomEmail(),
        'password': 'Administrador1234',
        'name': 'test'
    }
}