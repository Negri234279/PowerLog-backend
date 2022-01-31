const pool = require('../db')

const getAllWorkouts = async (req, res, next) => {
    try {
        const data = await pool.query('SELECT * FROM workouts')
        res.json(data.rows)
    } catch (error) {
        next(error)
    }
}

const getWorkoutsUser = async (req, res, next) => {
    try {
        const { idUser } = req.params
        const data = await pool.query('SELECT * FROM workouts WHERE id_user = $1', [idUser])
        return res.json(data.rows)
    } catch (error) {
        next(error)
    }
}

const getWorkouts = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await pool.query('SELECT * FROM workouts WHERE id_workouts = $1', [id])
        if (data.rows.length === 0) return res.status(404).json({ message: "Workout not found" })
        return res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

const createWorkout = async (req, res, next) => {
    const { workout, w_weight, w_reps, w_sets, w_date, id_user } = req.body
    try {
        const data = await pool.query(
            'INSERT INTO workouts (workout, w_weight, w_reps, w_sets, w_date, id_user) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [workout, w_weight, w_reps, w_sets, w_date, id_user]
        )
        console.log(data);
        res.json(data.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteWorkout = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM workouts WHERE id_workouts = $1', [id])
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
        const data = await pool.query(
            "UPDATE workouts SET workout = $1, w_weight = $2, w_reps = $3, w_sets = $4, w_date = $5 WHERE id_workouts = $6 RETURNING *",
            [workout, w_weight, w_reps, w_sets, w_date, id]
        );
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