const { sign } = require("jsonwebtoken");
const { userRegisterUseCase, userLoginUseCase } = require("../../application/useCase/user.useCase");
const { JWT_SECRET_KEY } = require("../config/common");
const MissingFieldsFormatException = require("../errors/missingFields.exception");
const UnnecesaryFieldsFormatException = require("../errors/unnecesaryFields.exception");

const userRegisterController = async (req, res, next) => {
    const { id, name, email, password, ...rest } = req.body

    try {
        if (!id || !name || !email || !password) throw new MissingFieldsFormatException()
        if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

        await userRegisterUseCase(id, name, email, password)

        return res.status(201).send()
    } catch (err) {
        next(err)
    }
}

const userLoginController = async (req, res, next) => {
    const { email, password, ...rest } = req.body

    try {
        if (!email || !password) throw new MissingFieldsFormatException()
        if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

        const id = await userLoginUseCase(email, password)

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