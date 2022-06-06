const { log } = require("console");
const { sign } = require("jsonwebtoken");
const { loginUserService } = require("../../application/useCase/user.useCase");
const { JWT_SECRET_KEY } = require("../config/common");



const userLoginController = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const id = await loginUserService(email, password)

        const jwt = sign({ id }, JWT_SECRET_KEY, {
            algorithm: 'HS512',
            expiresIn: '7d'
        })

        res.cookie('jwt', jwt, { maxAge: 900000, httpOnly: true })
        return res.send('Login correcto');
    } catch (err) {
        next(err)        
    }
}

module.exports = {
    userRegisterController,
    userLoginController
}