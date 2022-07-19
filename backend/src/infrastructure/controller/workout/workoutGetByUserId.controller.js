import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

export class workoutGetByUserIdController {
    constructor({ workoutGetByUserIdUseCase }) {
        this.workoutGetByUserIdUseCase = workoutGetByUserIdUseCase
    }

    async execute(req, res, next) {
        const { ...rest } = req.body
        const id = req.user.id

        try {
            if (!id) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            const data = await this.workoutGetByUserIdUseCase.execute(id)

            return res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    }

}