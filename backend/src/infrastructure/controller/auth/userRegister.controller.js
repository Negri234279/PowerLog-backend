const { userRegisterUseCase } = require("../../../application/useCase/user.useCase")
const MissingFieldsFormatException = require("../../errors/missingFields.exception")
const UnnecesaryFieldsFormatException = require("../../errors/unnecesaryFields.exception")

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

module.exports = { userRegisterController }