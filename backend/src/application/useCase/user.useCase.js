const bcrypt = require('bcrypt')
const UserModel = require('../../domain/models/user.model')
const UserRepository = require("../../infrastructure/repositories/user.repository")
const EmailAlreadyInUseException = require('../errors/emailAlreadyInUse.exception')
const IdAlreadyInUseException = require('../errors/idAlreadyInUse.exception')
const UserCredentialException = require('../errors/userCredential.exeption')

const userRegisterUseCase = async(id, name, email, password) => {
    const newUser = await UserModel.createRegister(id, name, email, password)

    const existUserById = await UserRepository.findById(id)
    if (existUserById) throw new IdAlreadyInUseException()

    const existUserByEmail = await UserRepository.findByEmail(email)
    if (existUserByEmail) throw new EmailAlreadyInUseException()
    
    await UserRepository.create(newUser)
}

const userLoginUseCase = async(email, password) => {
    await UserModel.createLogin(email, password)

    const user = await UserRepository.findByEmail(email)
    if (!user) throw new UserCredentialException()

    const vallidPassword = await bcrypt.compare(password, user.password)
    if (!vallidPassword) throw new UserCredentialException()
        
    return user.id
}

const userProfileUseCase = async(id) => {
    await UserModel.profile(id)

    const user = await UserRepository.findById(id)
    if (!user) throw new UserCredentialException()

    const { id: idUser, password, ...data } = user

    return data
}


module.exports = {
    userRegisterUseCase,
    userLoginUseCase,
    userProfileUseCase
}