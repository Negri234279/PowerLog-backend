import { Router } from 'express'
import container from '../container.js'
import authorize from '../middlewares/authorize.js'

const router = Router()

const workoutGetByUserIdController = container.resolve('workoutGetByUserIdController')
const workoutGetByIdController = container.resolve('workoutGetByIdController')
const workoutCreateController = container.resolve('workoutCreateController')

router.get('/', authorize, workoutGetByUserIdController.execute.bind(workoutGetByUserIdController))
router.get('/:id', authorize, workoutGetByIdController.execute.bind(workoutGetByIdController))
router.post('/', authorize, workoutCreateController.execute.bind(workoutCreateController))
// router.path('/:id', authorize, x.execute.bind(x))
// router.delete('/', authorize, x.execute.bind(x))

export { router as workout }