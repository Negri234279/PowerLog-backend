import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

export class workoutUpdateController {
    constructor({ workoutUpdateUseCase }) {
        this.workoutUpdateUseCase = workoutUpdateUseCase
    }

    async execute(req, res, next) {
        const { id } = req.params
        const { name, sets, reps, weight, date, ...rest } = req.body
        const idUser = req.user.id

        try {
            if (!id || !idUser || !name || !sets || !reps || !weight || !date) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            await this.workoutUpdateUseCase.execute(id, name, sets, reps, weight, date, idUser)

            return res.status(204).send()
        } catch (err) {
            next(err)
        }
    }

}