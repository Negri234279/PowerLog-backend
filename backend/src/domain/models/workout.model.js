import { InvalidWorkoutFormatException } from '../errors/invalidWorkoutFormat.exeption.js'
import { VOUuid } from '../valueObject/shared/uuid.vo.js'
import { VODate } from '../valueObject/workout/date.vo.js'
import { VOName } from '../valueObject/workout/name.vo.js'
import { VOReps } from '../valueObject/workout/reps.vo.js'
import { VOSets } from '../valueObject/workout/sets.vo.js'
import { VOWeight } from '../valueObject/workout/weight.vo.js'

/**
 * Registered workout in the application
 */
export class WorkoutModel {
    /**
     * @param {String} id 
     * @param {String} name 
     * @param {Number} weight 
     * @param {Number} reps 
     * @param {Number} sets 
     * @param {Date} date 
     * @param {String} idUser 
     */
    constructor(id, name, sets, reps, weight, date, idUser) {
        this.assertIsValid(id, name, sets, reps, weight, date, idUser)

        this.id = id
        this.name = name
        this.sets = sets
        this.reps = reps
        this.weight = weight
        this.date = date
        this.idUser = idUser
    }
    
    assertIsValid(id, name, sets, reps, weight, date, idUser) {
        if (
            !(id instanceof VOUuid) ||
            !(name instanceof VOName) ||
            !(sets instanceof VOSets) ||
            !(reps instanceof VOReps) ||
            !(weight instanceof VOWeight) ||
            !(date instanceof VODate) ||
            !(idUser instanceof VOUuid)
        )
            throw new InvalidWorkoutFormatException()
    }
}