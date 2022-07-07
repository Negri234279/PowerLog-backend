/*const MissingFieldsFormatException = require("../errors/missingFields.exception")
const UnnecesaryFieldsFormatException = require("../errors/unnecesaryFields.exception")

const workourCreateController = async (req, res, next) => {
    const { id, name, weight, reps, sets, date, ...rest } = req.body
    const idUser = req.user.id

    try {
        if (!id, !name, !weight, !reps, !sets, !date, !idUser) throw new MissingFieldsFormatException()
        if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

        //await userRegisterUseCase(id, name, email, password)

        return res.status(201).send()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    workourCreateController
}*/