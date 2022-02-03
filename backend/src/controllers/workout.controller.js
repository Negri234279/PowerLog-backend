const { findWorkoutByUserId, findWorkoutById, findAllWorkouts, createWorkoutById, deleteWorkoutById, updateWorkoutById } = require('../utils/findWorkout')

const getAllWorkouts = async (req, res, next) => {
    try {
        const data = await findAllWorkouts()
        return res.json(data.rows)
    } catch (error) {
        next(error)
    }
}

const getWorkoutsByUserID = async (req, res, next) => {
    try {
        const { idUser } = req.params
        const data = await findWorkoutByUserId(idUser)
        return res.json(data.rows)
    } catch (error) {
        next(error)
    }
}

const getWorkoutsById = async  (req, res, next) => {
    try {
        const { idWorkout } = req.params
        const data = await findWorkoutById(idWorkout)
        if (data.rows.length === 0) return res.status(404).json({ message: `Workout ${idWorkout} not found` })
        return res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

const createWorkout = async (req, res, next) => {
    const { workout, w_weight, w_reps, w_sets, w_date, id_user } = req.body
    try {
        const data = await createWorkoutById(workout, w_weight, w_reps, w_sets, w_date, id_user)
        return res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

const delWorkoutById = async (req, res, next) => {
    try {
        const { idWorkout } = req.params
        const result = await deleteWorkoutById(idWorkout)
        if (result.rowCount === 0) return res.status(404).json({ message: `Workout ${idWorkout} not found` })
        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

const updateWorkout = async (req, res, next) => {
    try {
        const { idWorkout } = req.params
        const { workout, w_weight, w_reps, w_sets, w_date } = req.body
        const data = await updateWorkoutById(workout, w_weight, w_reps, w_sets, w_date, idWorkout)
        res.json(data)
        if (data.rows.length === 0) return res.status(404).json({ message: `Workout ${idWorkout} not found` })
        res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllWorkouts,
    getWorkoutsByUserID,
    getWorkoutsById,
    createWorkout,
    delWorkoutById,
    updateWorkout
}