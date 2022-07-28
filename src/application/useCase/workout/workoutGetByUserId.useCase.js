import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { VODate } from '../../../domain/valueObject/workout/date.vo.js'
import { IdIsNotFoundException } from '../../errors/shared/IdIsNotFound.exeption.js'
import { InvalidLoginException } from '../../errors/user/invalidLogin.exeption.js'
import { WorkoutMap } from '../../mappers/workout.map.js'

export class workoutGetByUserIdUseCase {
    constructor({ workoutRepository, userRepository }) {
        this.workoutRepository = workoutRepository
        this.userRepository = userRepository
    }

    async execute(idUser, startDate, endDate) {
        const userId = new VOUuid(idUser)
        const dateStart = new VODate(startDate)
        const dateEnd = new VODate(endDate)

        const user = await this.userRepository.findById(userId)
        if (!user) throw new InvalidLoginException()

        const workout = await this.workoutRepository.findByUserId(userId)
        if (!workout) throw new IdIsNotFoundException()

        const workoutMap = WorkoutMap.toDTO(workout)

        const workoutFiltered = filterData(workoutMap, dateStart._value, dateEnd._value)
        const workoutSorted = sortData(workoutFiltered)

        return workoutSorted
    }

}

const filterData = (data, startDate, endDate) => {
    const filteredData = [...data]

    return filteredData.filter((a) => {
        return (new Date(a.date) >= new Date(startDate)) & (new Date(a.date) <= new Date(endDate))
    })
}

const sortData = (data) => {
    const sortedData = [...data]

    return sortedData.sort((a, b) => {
        if (a.date.getTime() > b.date.getTime()) return 1
        else if (a.date.getTime() < b.date.getTime()) return -1
        else if (a.date.getTime() === b.date.getTime()) {
            if (a.name.includes('SQ')) return -1
            else if (a.name.includes('BP') & b.name.includes('DL')) return -1
            else if (a.name < b.name) return 1
            else return 0
        }
        else return 0
    })
}