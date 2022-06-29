const UserModel = require("../../../domain/models/user.model")
const UserRepository = require("../../../infrastructure/repositories/user.repository")
const UserCredentialException = require("../../errors/userCredential.exeption")

const userProfileUseCase = async (id) => {
    await UserModel.profile(id)

    const user = await UserRepository.findById(id)
    if (!user) throw new UserCredentialException()

    const { id: idUser, password, ...data } = user

    return data
}

module.exports = userProfileUseCase