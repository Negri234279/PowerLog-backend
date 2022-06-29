const { userProfileUseCase } = require("../../../application/useCase/user.useCase")
const MissingFieldsFormatException = require("../../errors/missingFields.exception")
const UnnecesaryFieldsFormatException = require("../../errors/unnecesaryFields.exception")

const userProfileController = async (req, res, next) => {
    const { ...rest } = req.body
    const id = req.user.id

    try {
        if (!id) throw new MissingFieldsFormatException()
        if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

        const data = await userProfileUseCase(id)

        return res.status(200).send(data)
    } catch (err) {
        next(err)
    }
}

module.exports = { userProfileController }