const awilix = require('awilix')
const userLoginUseCase = require('../application/useCase/user/userLogin.useCase')
const userProfileUseCase = require('../application/useCase/user/userProfile.useCase')
const userRegisterUseCase = require('../application/useCase/user/userRegsiter.useCase')
const userLoginController = require('./controller/user/userLogin.controller')
const userProfileController = require('./controller/user/userProfile.controller')
const userRegisterController = require('./controller/user/userRegister.controller')
const UserRepository = require('./repositories/user.repository')

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
})

// Use cases
container.register({
    userLoginUseCase: awilix.asClass(userLoginUseCase).singleton(),
    userRegisterUseCase: awilix.asClass(userRegisterUseCase).singleton(),
    userProfileUseCase: awilix.asClass(userProfileUseCase).singleton(),
})

// Controllers
container.register({
    userLoginController: awilix.asClass(userLoginController).singleton(),
    userRegisterController: awilix.asClass(userRegisterController).singleton(),
    userProfileController: awilix.asClass(userProfileController).singleton(),
})

// Repositories
container.register({
    userRepository: awilix.asClass(UserRepository).singleton(),
})

module.exports = container