const { userLoginUseCase } = require("../../../application/useCase/user.useCase")
const MissingFieldsFormatException = require("../../errors/missingFields.exception")
const UnnecesaryFieldsFormatException = require("../../errors/unnecesaryFields.exception")
const { signAsync } = require("../../utils/jwt.util")

const userLoginController = async (req, res, next) => {
    const { email, password, ...rest } = req.body

    try {
        if (!email || !password) throw new MissingFieldsFormatException()
        if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

        const id = await userLoginUseCase(email, password)

        const payload = { id };
        const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

        const token = await signAsync(payload, signOptions)

        /*res.cookie(JWT_NAME, `Bearer ${token}`, {
            maxAge: 900000,
            httpOnly: true
        })*/

        return res.send(`Bearer ${token}`)
    } catch (err) {
        next(err)
    }
}

module.exports = userLoginController