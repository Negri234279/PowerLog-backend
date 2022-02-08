const { Router } = require('express')
const { registerUser, loginUser, verify } = require('../controllers/auth.controller')
const { profileUser } = require('../controllers/user.controller')
const { getAllWorkouts, createWorkout, updateWorkout, getWorkoutsByUserID, getWorkoutsById, delWorkoutById } = require('../controllers/workout.controller')
const authorize = require('../middleware/authorize')
const validInfo = require('../middleware/validInfo')


const router = Router()

//Workout
router.get('/api/workout', authorize, getWorkoutsByUserID)
router.get('/api/workout/update/:idWorkout', authorize, getWorkoutsById)
router.post('/api/workout', authorize, createWorkout)
router.delete('/api/workout/:idWorkout', authorize, delWorkoutById)
router.put('/api/workout/:idWorkout', authorize, updateWorkout)

//Auth
router.post('/api/auth/register', validInfo, registerUser)
router.post('/api/auth/login', validInfo, loginUser)
router.post('/api/auth/verify', authorize, verify)

//User
router.get('/api/user/profile', authorize, profileUser)

module.exports = router