const { Router } = require('express')
const { registerUser, loginUser, verify } = require('../controllers/auth.controller')
const { profileUser } = require('../controllers/user.controller')
const { getAllWorkouts, createWorkout, updateWorkout, getWorkoutsByUserID, getWorkoutsById, delWorkoutById } = require('../controllers/workout.controller')
const auhorize = require('../middleware/auhorize')
const validInfo = require('../middleware/validInfo')


const router = Router()

//Workout
router.get('/api/workout', auhorize, getWorkoutsByUserID)
router.get('/api/workout/update/:idWorkout', auhorize, getWorkoutsById)
router.post('/api/workout', auhorize, createWorkout)
router.delete('/api/workout/:idWorkout', auhorize, delWorkoutById)
router.put('/api/workout/:idWorkout', auhorize, updateWorkout)

//Auth
router.post('/api/auth/register', validInfo, registerUser)
router.post('/api/auth/login', validInfo, loginUser)
router.post('/api/auth/verify', auhorize, verify)

//User
router.get('/api/user/profile', auhorize, profileUser)

module.exports = router