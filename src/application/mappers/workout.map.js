import { WorkoutModel } from '../../domain/models/workout.model.js'

export class WorkoutMap {
    /**
    * Transforms a domain user into a dto user
    * @param {WorkoutModel} domainModel Database workout
    * @returns Domain user
    */
    static toDTO(domainModel) {
        if (Array.isArray(domainModel)) {
            const workouts = []

            for (let w of domainModel) {
                workouts.push({
                    id: w.id._value,
                    name: w.name._value,
                    weight: w.weight._value,
                    reps: w.reps._value,
                    sets: w.sets._value,
                    date: w.date._value,
                    idUser: w.idUser._value
                })
            }

            return workouts
        }

        const { id, name, weight, reps, sets, date, idUser } = domainModel

        return {
            id: id._value,
            name: name._value,
            weight: weight._value,
            reps: reps._value,
            sets: sets._value,
            date: date._value,
            idUser: idUser._value
        }

    }
}