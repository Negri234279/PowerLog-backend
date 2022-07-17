import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { IdIsNotFoundException } from '../../errors/shared/IdIsNotFound.exeption.js'

export class workoutDeleteUseCase {
    constructor({ workoutRepository }) {
        this.workoutRepository = workoutRepository
    }

    async execute(id, idUser) {
        const workoutId = new VOUuid(id)
        const userId = new VOUuid(idUser)

        const workout = await this.workoutRepository.findById(workoutId, userId)
        if (!workout) throw new IdIsNotFoundException()

        return await this.workoutRepository.delete(workoutId, userId)
    }

}