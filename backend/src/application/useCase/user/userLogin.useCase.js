const bcrypt = require('bcrypt') 
const UserModel = require("../../../domain/models/user.model")
const UserRepository = require("../../../infrastructure/repositories/user.repository")
const UserCredentialException = require("../../errors/userCredential.exeption")

const userLoginUseCase = async (email, password) => {
    await UserModel.createLogin(email, password)

    const user = await UserRepository.findByEmail(email)
    if (!user) throw new UserCredentialException()

    const vallidPassword = await bcrypt.compare(password, user.password)
    if (!vallidPassword) throw new UserCredentialException()

    return user.id
}

module.exports = userLoginUseCase