import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

export class workoutCreateController {
    constructor({ workoutCreateUseCase }) {
        this.workoutCreateUseCase = workoutCreateUseCase
    }

    async execute(req, res, next) {
        const { id, name, sets, reps, weight, date, ...rest } = req.body
        const idUser = req.user.id

        try {
            if (!id || !name || !sets || !reps || !weight || !date || !idUser) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            await this.workoutCreateUseCase.execute(id, name, sets, reps, weight, date, idUser)

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

}