const { test: uuidTest } = require('uuid-random')
const InvalidIdFormatException = require('../errors/invalidIdFormat.exception')
const InvalidNameFormatException = require('../errors/invalidNameFormat.exception')
const InvalidWeightFormatException = require('../errors/invalidWeightFormat.exception')


/**
 * Registered workout in the application
 */
class WorkoutModel {
    /**
     * 
     * @param {String} id 
     * @param {String} name 
     * @param {Number} weight 
     * @param {Number} reps 
     * @param {Number} sets 
     * @param {Date} date 
     * @param {String} idUser 
     */
    constructor(id, name, weight, reps, sets, date, idUser) {
        this.id = id
        this.name = name
        this.weight = weight
        this.reps = reps
        this.sets = sets
        this.date = date
        this.idUser = idUser
    }

    static validateId(id) {
        return uuidTest(id)
    }

    static validateName(name) {
        return typeof name == 'string'
    }

    static validateWeight(weight) {
        const weightRegex = /^[0-9]{1,4}$/
        return weightRegex.test(weight)
    }

    static validateReps(reps) {
        const repsRegex = /^[0-9]{1,3}$/
        return repsRegex.test(reps)
    }

    static validateSets(sets) {
        const setsRegex = /^[0-9]{1,2}$/
        return setsRegex.test(sets)
    }

    static validateIdUser(idUser) {
        return uuidTest(idUser)
    }

    static async create(id, name, weight, reps, sets, date, idUser) {
        
        if (!WorkoutModel.validateId(id))
            throw new InvalidIdFormatException()

        if (!WorkoutModel.validateName(name))
            throw new InvalidNameFormatException()

        if (!WorkoutModel.validateWeight(weight))
            throw new InvalidWeightFormatException()

        if (!WorkoutModel.validateReps(reps))
            throw new InvalidRepsFormatException()
        
        if (!WorkoutModel.validateSets(sets))
            throw new InvalidSetsFormatException()
        
        if (!WorkoutModel.validateIdUser(idUser))
            throw new InvalidIdUserFormatException()


        return new WorkoutModel(id, name, weight, reps, sets, date, idUser)
    }
}

module.exports = WorkoutModel