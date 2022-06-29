const awilix = require('awilix')
const userLoginUseCase = require('../application/useCase/user/userLogin.useCase')
const userLoginController = require('./controller/user/userLogin.controller')
const UserRepository = require('./repositories/user.repository')

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
})

// Use cases
container.register({
    userLoginUseCase: awilix.asClass(userLoginUseCase).singleton(),
})

// Controllers
container.register({
    userLoginController: awilix.asClass(userLoginController).singleton(),
})

// Repositories
container.register({
    userRepository: awilix.asClass(UserRepository).singleton(),
})

module.exports = container