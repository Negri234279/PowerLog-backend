import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

export class workoutDeleteController {
    constructor({ workoutDeleteUseCase }) {
        this.workoutDeleteUseCase = workoutDeleteUseCase
    }

    async execute(req, res, next) {
        const { id } = req.params
        const { ...rest } = req.body
        const idUser = req.user.id

        try {
            if (!id || !idUser) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            await this.workoutDeleteUseCase.execute(id, idUser)

            return res.status(204).send()
        } catch (err) {
            next(err)
        }
    }

}