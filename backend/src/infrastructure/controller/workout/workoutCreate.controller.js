import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

export class workoutCreateController {
    constructor({ workoutCreateUseCase }) {
        this.workoutCreateUseCase = workoutCreateUseCase
    }

    async execute(req, res, next) {
        const { id, name, weight, reps, sets, date, idUser, ...rest } = req.body

        try {
            if (!id || !name || !weight || !reps || !sets || !date || !idUser) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            await this.workoutCreateUseCase.execute(id, name, weight, reps, sets, date, idUser)

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

}