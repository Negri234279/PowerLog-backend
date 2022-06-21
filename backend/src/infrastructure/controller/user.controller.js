const { sign } = require("jsonwebtoken");
const { userRegisterUseCase, userLoginUseCase, userProfileUseCase } = require("../../application/useCase/user.useCase");
const { JWT_SECRET_KEY, JWT_NAME } = require("../config/common");
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

        res.cookie(JWT_NAME, `Bearer ${jwt}`, {
            maxAge: 900000,
            httpOnly: true
        })

        return res.send();
    } catch (err) {
        next(err)        
    }
}

const userProfileController = async (req, res, next) => {
    const { ...rest } = req.body
    const id = req.user.id

    try {
        if (!id) throw new MissingFieldsFormatException()
        if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

        const data = await userProfileUseCase(id)

        /*res.cookie('profile', data, {
            maxAge: 900000,
            httpOnly: true
        })*/

        return res.status(200).send(data)        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userRegisterController,
    userLoginController,
    userProfileController
}