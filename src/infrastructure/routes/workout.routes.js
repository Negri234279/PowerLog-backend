import { Router } from 'express'
import container from '../container.js'
import authorize from '../middlewares/authorize.js'

const router = Router()

const workoutGetByUserIdController = container.resolve('workoutGetByUserIdController')
const workoutGetByIdController = container.resolve('workoutGetByIdController')
const workoutCreateController = container.resolve('workoutCreateController')
const workoutUpdateController = container.resolve('workoutUpdateController')
const workoutDeleteController = container.resolve('workoutDeleteController')

router.get('/', authorize, workoutGetByUserIdController.execute.bind(workoutGetByUserIdController))
router.get('/:id', authorize, workoutGetByIdController.execute.bind(workoutGetByIdController))
router.post('/', authorize, workoutCreateController.execute.bind(workoutCreateController))
router.patch('/:id', authorize, workoutUpdateController.execute.bind(workoutUpdateController))
router.delete('/:id', authorize, workoutDeleteController.execute.bind(workoutDeleteController))

export { router as workout }