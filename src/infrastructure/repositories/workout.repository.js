import { WorkoutModel } from '../../domain/models/workout.model.js'
import { VOUuid } from '../../domain/valueObject/shared/uuid.vo.js'
import { VODate } from '../../domain/valueObject/workout/date.vo.js'
import { VOName } from '../../domain/valueObject/workout/name.vo.js'
import { VOReps } from '../../domain/valueObject/workout/reps.vo.js'
import { VOSets } from '../../domain/valueObject/workout/sets.vo.js'
import { VOWeight } from '../../domain/valueObject/workout/weight.vo.js'

export class WorkoutRepository {
    constructor({ pool }) {
        this.pool = pool
    }

    /**
    * Transforms a database user into a domain user
    * @param {*} persistanceWorkout Database user
    * @returns Domain user
    */
    toDomain(persistanceWorkout) {
        return persistanceWorkout.rows.map((w) => {
            return new WorkoutModel(
                new VOUuid(w.id_workouts),
                new VOName(w.workout),
                new VOSets(w.w_sets),
                new VOReps(w.w_reps),
                new VOWeight(w.w_weight),
                new VODate(w.w_date),
                new VOUuid(w.id_user)
            )
        })
    }

    /**
     * Transforms a domain user into a database user
     * @param {WorkoutModel} domainWorkout Domain user
     * @returns Database user
     */ 
    toPersistance(domainWorkout) {
        const { id, name, sets, reps, weight, date, idUser } = domainWorkout

        return {
            id: id._value,
            name: name._value,
            sets: sets._value,
            reps: reps._value,
            weight: weight._value,
            date: date._value,
            idUser: idUser._value
        }
    }

    async findById(id, idUser) {
        const workoutFound = await this.pool.query(
            'SELECT * FROM workouts WHERE id_workouts = $1 AND id_user = $2',
            [id._value, idUser._value]
        )

        if (!workoutFound.rows[0]) return null

        return this.toDomain(workoutFound)
    }

    async findByUserId(id) {
        const workoutFound = await this.pool.query(
            'SELECT * FROM workouts WHERE id_user = $1',
            [id._value]
        )

        if (!workoutFound.rows[0]) return []

        return this.toDomain(workoutFound)
    }

    async create(domainWorkout) {
        const { id, name, sets, reps, weight, date, idUser } = this.toPersistance(domainWorkout)

        return await this.pool.query(
            'INSERT INTO workouts (id_workouts, workout, w_sets, w_reps, w_weight, w_date, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [id, name, sets, reps, weight, date, idUser]
        )
    }

    async update(domainWorkout) {
        const { id, name, sets, reps, weight, date, idUser } = this.toPersistance(domainWorkout)

        return await this.pool.query(
            'UPDATE workouts SET workout = $1, w_sets = $2, w_reps = $3, w_weight = $4, w_date = $5 WHERE id_workouts = $6 AND id_user = $7  RETURNING *',
            [name, sets, reps, weight, date, id, idUser]
        )
    }

    async delete(id, idUser) {
        return await this.pool.query(
            'DELETE FROM workouts WHERE id_workouts = $1 AND id_user = $2',
            [id._value, idUser._value]
        )
    }

}