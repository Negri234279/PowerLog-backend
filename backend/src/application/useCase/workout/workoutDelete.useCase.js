import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'

export class workoutDeleteUseCase {
    constructor({ workoutRepository }) {
        this.workoutRepository = workoutRepository
    }

    async execute(id, idUser) {
        const workoutId = new VOUuid(id)
        const userId = new VOUuid(idUser)

        const workout = await this.workoutRepository.delete(workoutId, userId)
        if (!workout) throw new Error('Not found')

        return
    }

}