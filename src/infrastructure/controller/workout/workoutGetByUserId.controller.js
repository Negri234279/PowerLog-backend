import { SORT_OPTION } from '../../../application/constants/workoutSortOption.js'
import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

export class workoutGetByUserIdController {
    constructor({ workoutGetByUserIdUseCase }) {
        this.workoutGetByUserIdUseCase = workoutGetByUserIdUseCase
    }

    async execute(req, res, next) {
        const { ...rest } = req.body
        const idUser = req.user.id
        const startDate = req.query.startDate || new Date('01/01/1971')
        const endDate = req.query.endDate || new Date('01/01/2099')
        const page = Number(req.query._page || 1)
        const limit = Number(req.query._limit || 99999)
        const sortBy = Number(req.query._sort || SORT_OPTION.DEFAULT)

        try {
            if (!idUser) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            const data = await this.workoutGetByUserIdUseCase.execute(idUser, { startDate, endDate, page, limit, sortBy })

            return res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    }

}