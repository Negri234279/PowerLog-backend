const { log } = require("console");
const { sign } = require("jsonwebtoken");
const { loginUserService } = require("../../application/useCase/user.useCase");
const { JWT_SECRET_KEY } = require("../config/common");

const userRegisterController = async (req, res, next) => {    
    return res.status(200)
}

const userLoginController = async (req, res, next) => {    
    try {
        const id = await loginUserService(req.body)

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