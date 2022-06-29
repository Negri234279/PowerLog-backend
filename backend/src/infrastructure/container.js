const { createContainer, InjectionMode, asClass, asFunction } = require('awilix')
const { Pool } = require('pg')
const { DB } = require('./config/common')
const userLoginUseCase = require('../application/useCase/user/userLogin.useCase')
const userProfileUseCase = require('../application/useCase/user/userProfile.useCase')
const userRegisterUseCase = require('../application/useCase/user/userRegsiter.useCase')
const userLoginController = require('./controller/user/userLogin.controller')
const userProfileController = require('./controller/user/userProfile.controller')
const userRegisterController = require('./controller/user/userRegister.controller')
const UserRepository = require('./repositories/user.repository')

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
    pool: asFunction(() => new Pool(DB)).singleton().disposer(pool => pool.end()),
})

module.exports = container