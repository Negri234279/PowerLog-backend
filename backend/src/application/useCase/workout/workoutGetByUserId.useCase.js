import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { IdIsNotFoundException } from '../../errors/shared/IdIsNotFound.exeption.js'
import { InvalidLoginException } from '../../errors/user/invalidLogin.exeption.js'
import { WorkoutMap } from '../../mappers/workout.map.js'

export class workoutGetByUserIdUseCase {
    constructor({ workoutRepository, userRepository }) {
        this.workoutRepository = workoutRepository
        this.userRepository = userRepository
    }

    async execute(idUser) {
        const userId = new VOUuid(idUser)

        const user = await this.userRepository.findById(userId)
        if (!user) throw new InvalidLoginException()

        const workout = await this.workoutRepository.findByUserId(userId)
        if (!workout) throw new IdIsNotFoundException()

        return WorkoutMap.toDTO(workout)
    }

}