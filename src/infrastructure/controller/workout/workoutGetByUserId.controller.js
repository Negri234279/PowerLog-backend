import { FILTERS_OPTION } from '../../../application/constants/workoutDateFilterOption.js'
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
        const page = Number(req.query._page || 1)
        const limit = Number(req.query._limit || 99999)
        const sortBy = Number(req.query._sort || SORT_OPTION.DEFAULT)
        const filterBy = Number(req.query._filter || FILTERS_OPTION.DEFAULT)

        try {
            if (!idUser) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            const data = await this.workoutGetByUserIdUseCase.execute(idUser, { page, limit, sortBy, filterBy })

            return res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    }

}