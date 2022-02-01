const pool = require('../db')
const { findWorkoutByUser, findWorkoutById, findAllWorkouts, createWorkoutById, deleteWorkoutById, updateWorkoutById } = require('../utils/findWorkout')

const getAllWorkouts = async (req, res, next) => {
    try {
        const data = await findAllWorkouts()
        res.json(data.rows)
    } catch (error) {
        next(error)
    }
}

const getWorkoutsUser = async (req, res, next) => {
    try {
        const { idUser } = req.params
        const data = await findWorkoutByUser(idUser)
        return res.json(data.rows)
    } catch (error) {
        next(error)
    }
}

const getWorkouts = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = findWorkoutById(id)
        if (data.rows.length === 0) return res.status(404).json({ message: "Workout not found" })
        return res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

const createWorkout = async (req, res, next) => {
    const { workout, w_weight, w_reps, w_sets, w_date, id_user } = req.body
    try {
        const data = createWorkoutById(workout, w_weight, w_reps, w_sets, w_date, id_user)
        console.log(data);
        res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteWorkout = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = deleteWorkoutById(id)
        if (result.rowCount === 0) return res.status(404).json({ message: "Workout not found" })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

const updateWorkout = async (req, res, next) => {
    try {
        const { id } = req.params
        const { workout, w_weight, w_reps, w_sets, w_date } = req.body
        const data = updateWorkoutById(workout, w_weight, w_reps, w_sets, w_date, id)
        res.json(data)
        if (data.rows.length === 0) return res.status(404).json({ message: "Workout not found" })
        res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllWorkouts,
    getWorkoutsUser,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}