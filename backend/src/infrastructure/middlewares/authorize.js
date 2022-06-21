const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY, JWT_NAME } = require('../config/common');
const InvalidTokenException = require('../errors/invalidToken.exeption');
const MissingTokenException = require('../errors/missingToken.exception');

module.exports = function (req, res, next) {
    const token = req.header(JWT_NAME)

    try {
        if (!token) throw new MissingTokenException()
        
        const bearer = token.split(' ')[1]

        jwt.verify(bearer, JWT_SECRET_KEY, (err, user) => {
            if (err) throw new InvalidTokenException()

            req.user = user
        })

        next()
    } catch (error) {
        next(error)
    }
}