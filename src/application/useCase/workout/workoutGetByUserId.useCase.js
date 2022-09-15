import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { IdIsNotFoundException } from '../../errors/shared/IdIsNotFound.exeption.js'
import { InvalidLoginException } from '../../errors/user/invalidLogin.exeption.js'
import { filterWorkout } from '../../helpers/filterWorkout.js'
import { paginateWorkouts } from '../../helpers/paginateWorkouts.js'
import { sortWorkout } from '../../helpers/sortWorkout.js'
import { useFilters } from '../../hooks/useFilters.js'
import { WorkoutMap } from '../../mappers/workout.map.js'

export class workoutGetByUserIdUseCase {
    constructor({ workoutRepository, userRepository }) {
        this.workoutRepository = workoutRepository
        this.userRepository = userRepository
    }

    async execute(idUser, filters) {
        const userId = new VOUuid(idUser)

        const user = await this.userRepository.findById(userId)
        if (!user) throw new InvalidLoginException()

        const workout = await this.workoutRepository.findByUserId(userId)

        const workoutMap = WorkoutMap.toDTO(workout)

        return useFilters(workoutMap, filters)
    }

}
