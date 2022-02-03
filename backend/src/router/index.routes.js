const { Router } = require('express')
const { registerUser } = require('../controllers/auth.controller')
const { getAllWorkouts, createWorkout, updateWorkout, getWorkoutsByUserID, getWorkoutsById, delWorkoutById } = require('../controllers/workout.controller')
const validInfo = require('../middleware/validInfo')


const router = Router()

//Workout
router.get('/api/workout', getAllWorkouts)
router.get('/api/workout/:idUser', getWorkoutsByUserID)
router.get('/api/workout/update/:idWorkout', getWorkoutsById)
router.post('/api/workout', createWorkout)
router.delete('/api/workout/:idWorkout', delWorkoutById)
router.put('/api/workout/:idWorkout', updateWorkout)

//Auth
router.post('/api/auth/register', validInfo, registerUser)

module.exports = router