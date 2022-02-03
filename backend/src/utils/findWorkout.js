const pool = require('../db')

/**
 * Finds all workout
 * @returns All workout
 */
const findAllWorkouts = () => {
    return pool.query('SELECT * FROM workouts')
}

/**
 * Finds a workout by Id
 * @param {Number} id_workouts Workout Id
 * @returns All workout from user
 */
const findWorkoutById = (id_workouts) => {
    return pool.query(
        'SELECT * FROM workouts WHERE id_workouts = $1',
        [id_workouts]
    )
}

/**
 * Finds a workout by User Id
 * @param {UUID} id_user Workout User Id
 * @returns All workout from user
 */
const findWorkoutByUserId = (id_user) => {
    return pool.query(
        'SELECT * FROM workouts WHERE id_user = $1',
        [id_user]
    )
}

/**
 * Create a workout by id user
 * @param {String} workout Name workout
 * @param {Number} w_weight Weight workout
 * @param {Number} w_reps Number of reps workout
 * @param {Number} w_sets Number of sets workout
 * @param {Date} w_date Date workout
 * @param {UUID} id_user Id user
 * @returns Workout data
 */
const createWorkoutById = (workout, w_weight, w_reps, w_sets, w_date, id_user) => {
    return pool.query(
        'INSERT INTO workouts (workout, w_weight, w_reps, w_sets, w_date, id_user) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [workout, w_weight, w_reps, w_sets, w_date, id_user]
    )
}

/**
 * Delete a workout by ID
 * @param {Number} id_workouts Workout ID
 * @returns Workout data
 */
const deleteWorkoutById = (id_workouts) => {
    return pool.query(
        'DELETE FROM workouts WHERE id_workouts = $1',
        [id_workouts]
    )
}

/**
 * Update a workout by id
 * @param {String} workout Name workout
 * @param {Number} w_weight Weight workout
 * @param {Number} w_reps Number of reps workout
 * @param {Number} w_sets Number of sets workout
 * @param {Date} w_date Date workout
 * @param {Number} id_workout Id workout
 * @returns Workout data
 */
const updateWorkoutById = (workout, w_weight, w_reps, w_sets, w_date, id_workout) => {
    return pool.query(
        'UPDATE workouts SET workout = $1, w_weight = $2, w_reps = $3, w_sets = $4, w_date = $5 WHERE id_workouts = $6 RETURNING *',
        [workout, w_weight, w_reps, w_sets, w_date, id_workout]
    )
}

module.exports = {
    findWorkoutByUserId,
    findWorkoutById,
    findAllWorkouts,
    createWorkoutById,
    deleteWorkoutById,
    updateWorkoutById
}