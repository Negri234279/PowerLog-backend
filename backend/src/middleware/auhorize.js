const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

module.exports = function (req, res, next) {

    const token = req.header("jwt_token")
    if (!token) return res.status(403).json({ message: 'Authorization denied' })

    try {
        const verify = jwt.verify(token, jwtSecret)
        req.user = verify.user

        next()
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' })
    }
}