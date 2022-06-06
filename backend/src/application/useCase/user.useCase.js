const bcrypt = require('bcrypt')
const UserModel = require('../../domain/models/user.model')
const UserRepository = require("../../infrastructure/repositories/user.repository")
const UserCredentialException = require('../errors/userCredential.exeption')
const UserIdAlreadyInUseException = require('../errors/userIdAlreadyInUse.exception')
const UserEmailAlreadyInUseException = require('../errors/userEmailAlreadyInUse.exception')

const userRegisterUseCase = async(id, name, email, password) => {
    const newUser = await UserModel.createRegister(id, name, email, password)

    const existUserById = await UserRepository.findByEmail(email)
    if (existUserById) throw new UserIdAlreadyInUseException()

    const existUserByEmail = await UserRepository.findByEmail(email)
    if (existUserByEmail) throw new UserEmailAlreadyInUseException()
    
    await UserRepository.create(newUser)
}

const userLoginUseCase = async (email, password) => {
    await UserModel.createLogin(email, password)

    const user = await UserRepository.findByEmail(email)
    if (!user) throw new UserCredentialException()

    const vallidPassword = await bcrypt.compare(password, user.password)
    if (!vallidPassword) throw new UserCredentialException()
        
    return user.id
}



module.exports = { userRegisterUseCase, userLoginUseCase }