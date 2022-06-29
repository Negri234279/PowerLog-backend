const UserModel = require("../../../domain/models/user.model")
const UserRepository = require("../../../infrastructure/repositories/user.repository")
const EmailAlreadyInUseException = require("../../errors/emailAlreadyInUse.exception")
const IdAlreadyInUseException = require("../../errors/idAlreadyInUse.exception")

const userRegisterUseCase = async (id, name, email, password) => {
    const newUser = await UserModel.createRegister(id, name, email, password)

    const existUserById = await UserRepository.findById(id)
    if (existUserById) throw new IdAlreadyInUseException()

    const existUserByEmail = await UserRepository.findByEmail(email)
    if (existUserByEmail) throw new EmailAlreadyInUseException()

    await UserRepository.create(newUser)
}

module.exports = userRegisterUseCase