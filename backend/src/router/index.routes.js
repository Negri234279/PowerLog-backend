const { Router } = require('express')
const { getAllWorkouts, getWorkouts, createWorkout, deleteWorkout, updateWorkout, getWorkoutsUser } = require('../controllers/workout.controller')


const router = Router()

router.get('/api/workout', getAllWorkouts)
router.get('/api/:idUser/workout', getWorkoutsUser)
router.get('/api/workout/:id', getWorkouts)
router.post('/api/workout', createWorkout)
router.delete('/api/workout/:id', deleteWorkout)
router.put('/api/workout/:id', updateWorkout)

module.exports = router