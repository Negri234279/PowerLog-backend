import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { WorkoutMap } from '../../mappers/workout.map.js'

export class workoutGetByUserIdUseCase {
    constructor({ workoutRepository }) {
        this.workoutRepository = workoutRepository
    }

    async execute(id) {
        const userId = new VOUuid(id)

        const workout = await this.workoutRepository.findByUserId(userId)
        if (!workout) throw new Error('F')

        // const { id: idWorkout, name, weight, reps, sets, date } = WorkoutMap.toDTO(workout)

        return WorkoutMap.toDTO(workout)
    }

}