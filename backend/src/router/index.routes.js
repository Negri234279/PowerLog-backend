const { Router } = require('express')
const { getAllTasks, getTasks, createTask, deleteTask, updateTask } = require('../controllers/task.controller')

const router = Router()

router.get('/tasks', getAllTasks)

router.get('/tasks/:id', getTasks)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks/:id', updateTask)


module.exports = router