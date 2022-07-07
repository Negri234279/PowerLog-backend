import awilix from 'awilix'
const { createContainer, InjectionMode, asClass, asFunction } = awilix
import postgres from 'pg'
import { userLoginUseCase } from '../application/useCase/user/userLogin.useCase.js'
import { userProfileUseCase } from '../application/useCase/user/userProfile.useCase.js'
import { userRegisterUseCase } from '../application/useCase/user/userRegsiter.useCase.js'
import { DB } from './config/common.js'
import { userLoginController } from './controller/user/userLogin.controller.js'
import { userProfileController } from './controller/user/userProfile.controller.js'
import { userRegisterController } from './controller/user/userRegister.controller.js'
import { UserRepository } from './repositories/user.repository.js'

const container = createContainer({
    injectionMode: InjectionMode.PROXY,
})

// Use cases
container.register({
    userLoginUseCase: asClass(userLoginUseCase).singleton(),
    userRegisterUseCase: asClass(userRegisterUseCase).singleton(),
    userProfileUseCase: asClass(userProfileUseCase).singleton(),
})

// Controllers
container.register({
    userLoginController: asClass(userLoginController).singleton(),
    userRegisterController: asClass(userRegisterController).singleton(),
    userProfileController: asClass(userProfileController).singleton(),
})

// Repositories
container.register({
    userRepository: asClass(UserRepository).singleton(),
})

//DB
container.register({
    pool: asFunction(() => new postgres.Pool(DB)).singleton().disposer(pool => pool.end()),
})

export default container