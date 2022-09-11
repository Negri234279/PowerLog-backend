import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { IdIsNotFoundException } from '../../errors/shared/IdIsNotFound.exeption.js'
import { InvalidLoginException } from '../../errors/user/invalidLogin.exeption.js'
import { filterWorkout } from '../../helpers/filterWorkout.js'
import { paginateWorkouts } from '../../helpers/paginateWorkouts.js'
import { sortWorkout } from '../../helpers/sortWorkout.js'
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
        if (!workout) throw new IdIsNotFoundException()

        const workoutMap = WorkoutMap.toDTO(workout)

        const workoutFiltered = filterWorkout(workoutMap, filters.filterBy)

        const workoutSorted = sortWorkout(workoutFiltered, filters.sortBy)

        const paginatedWorkouts = paginateWorkouts(workoutSorted, filters.page, filters.limit)

        return {
            count: workoutSorted.length,
            data: paginatedWorkouts,
        }
    }

}
