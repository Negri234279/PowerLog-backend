import { WorkoutModel } from '../../domain/models/workout.model.js'

export class WorkoutMap {
    /**
    * Transforms a domain user into a dto user
    * @param {WorkoutModel} domainModel Database workout
    * @returns Domain user
    */
    static toDTO(domainModel) {
        return domainModel.map((workout) => {
            return {
                id: workout.id._value,
                name: workout.name._value,
                weight: workout.weight._value,
                reps: workout.reps._value,
                sets: workout.sets._value,
                date: workout.date._value,
                idUser: workout.idUser._value,
            }
        })

    }
}