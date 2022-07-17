import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { WorkoutMap } from '../../mappers/workout.map.js'

export class workoutGetByIdUseCase {
    constructor({ workoutRepository }) {
        this.workoutRepository = workoutRepository
    }

    async execute(id, idUser) {
        const workoutId = new VOUuid(id)
        const userId = new VOUuid(idUser)

        const workout = await this.workoutRepository.findById(workoutId, userId)
        if (!workout) throw new Error('Not found')

        // const { id: idWorkout, name, weight, reps, sets, date } = WorkoutMap.toDTO(workout)

        return WorkoutMap.toDTO(workout)
    }

}