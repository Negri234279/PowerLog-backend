import { WorkoutModel } from '../../../domain/models/workout.model.js'
import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { VODate } from '../../../domain/valueObject/workout/date.vo.js'
import { VOName } from '../../../domain/valueObject/workout/name.vo.js'
import { VOReps } from '../../../domain/valueObject/workout/reps.vo.js'
import { VOSets } from '../../../domain/valueObject/workout/sets.vo.js'
import { VOWeight } from '../../../domain/valueObject/workout/weight.vo.js'
import { IdAlreadyInUseException } from '../../errors/shared/idAlredyInUse.exeption.js'
import { InvalidLoginException } from '../../errors/user/invalidLogin.exeption.js'

export class workoutCreateUseCase {
    constructor({ workoutRepository, userRepository }) {
        this.workoutRepository = workoutRepository
        this.userRepository = userRepository
    }

    async execute(id, name, sets, reps, weight, date, idUser) {
        const workoutId = new VOUuid(id)
        const userId = new VOUuid(idUser)

        const user = await this.userRepository.findById(userId)
        if (!user) throw new InvalidLoginException()

        const existWorkoutById = await this.workoutRepository.findById(workoutId, userId)
        if (existWorkoutById) throw new IdAlreadyInUseException()

        const newWorkout = new WorkoutModel(
            workoutId,
            new VOName(name),
            new VOSets(sets),
            new VOReps(reps),
            new VOWeight(weight),
            new VODate(date),
            userId
        )

        return await this.workoutRepository.create(newWorkout)
    }
}