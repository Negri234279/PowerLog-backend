import awilix from 'awilix'
const { createContainer, InjectionMode, asClass, asFunction } = awilix
import postgres from 'pg'
import { userLoginUseCase } from '../application/useCase/user/userLogin.useCase.js'
import { userProfileUseCase } from '../application/useCase/user/userProfile.useCase.js'
import { userRegisterUseCase } from '../application/useCase/user/userRegsiter.useCase.js'
import { workoutCreateUseCase } from '../application/useCase/workout/workoutCreate.useCase.js'
import { workoutDeleteUseCase } from '../application/useCase/workout/workoutDelete.useCase.js'
import { workoutGetByIdUseCase } from '../application/useCase/workout/workoutGetById.useCase.js'
import { workoutGetByUserIdUseCase } from '../application/useCase/workout/workoutGetByUserId.useCase.js'
import { workoutUpdateUseCase } from '../application/useCase/workout/workoutUpdate.useCase.js'
import { DB } from './config/common.js'
import { userLoginController } from './controller/user/userLogin.controller.js'
import { userProfileController } from './controller/user/userProfile.controller.js'
import { userRegisterController } from './controller/user/userRegister.controller.js'
import { workoutCreateController } from './controller/workout/workoutCreate.controller.js'
import { workoutDeleteController } from './controller/workout/workoutDelete.controller.js'
import { workoutGetByIdController } from './controller/workout/workoutGetById.controller.js'
import { workoutGetByUserIdController } from './controller/workout/workoutGetByUserId.controller.js'
import { workoutUpdateController } from './controller/workout/workoutUpdate.controller.js'
import { UserRepository } from './repositories/user.repository.js'
import { WorkoutRepository } from './repositories/workout.repository.js'

const container = createContainer({
    injectionMode: InjectionMode.PROXY,
})

// Use cases
container.register({
    // User
    userLoginUseCase: asClass(userLoginUseCase).singleton(),
    userRegisterUseCase: asClass(userRegisterUseCase).singleton(),
    userProfileUseCase: asClass(userProfileUseCase).singleton(),

    // Workout
    workoutGetByUserIdUseCase: asClass(workoutGetByUserIdUseCase).singleton(),
    workoutGetByIdUseCase: asClass(workoutGetByIdUseCase).singleton(),
    workoutCreateUseCase: asClass(workoutCreateUseCase).singleton(),
    workoutUpdateUseCase: asClass(workoutUpdateUseCase).singleton(),
    workoutDeleteUseCase: asClass(workoutDeleteUseCase).singleton(),
})

// Controllers
container.register({
    // User
    userLoginController: asClass(userLoginController).singleton(),
    userRegisterController: asClass(userRegisterController).singleton(),
    userProfileController: asClass(userProfileController).singleton(),

    // Workout
    workoutGetByUserIdController: asClass(workoutGetByUserIdController).singleton(),
    workoutGetByIdController: asClass(workoutGetByIdController).singleton(),
    workoutCreateController: asClass(workoutCreateController).singleton(),
    workoutUpdateController: asClass(workoutUpdateController).singleton(),
    workoutDeleteController: asClass(workoutDeleteController).singleton(),
})

// Repositories
container.register({
    userRepository: asClass(UserRepository).singleton(),
    workoutRepository: asClass(WorkoutRepository).singleton(),
})

//DB
container.register({
    pool: asFunction(() => new postgres.Pool(DB)).singleton().disposer(pool => pool.end()),
})

export default container