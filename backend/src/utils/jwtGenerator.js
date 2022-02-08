const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config')

const jwtGenerator = (id_user) => {
    const payload = {
        user: {
            idUser: id_user
        }
    }

    return jwt.sign(payload, jwtSecret, { expiresIn: '24h' })
}

module.exports = jwtGenerator