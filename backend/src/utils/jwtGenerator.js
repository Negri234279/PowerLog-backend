const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config')

const jwtGenerator = (id_user) => {
    const payload = {
        'id': `${id_user}`
    }

    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
}

module.exports = jwtGenerator