import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

export class workoutGetByIdController {
    constructor({ workoutGetByIdUseCase }) {
        this.workoutGetByIdUseCase = workoutGetByIdUseCase
    }

    async execute(req, res, next) {
        const { id } = req.params
        const { ...rest } = req.body
        const idUser = req.user.id

        try {
            if (!id || !idUser) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            const data = await this.workoutGetByIdUseCase.execute(id, idUser)

            return res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    }

}