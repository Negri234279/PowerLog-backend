const UserModel = require("../../../domain/models/user.model")
const UserCredentialException = require("../../errors/userCredential.exeption")

module.exports = class userProfileUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(id) {
        await UserModel.profile(id)

        const user = await this.userRepository.findById(id)
        if (!user) throw new UserCredentialException()

        const { id: idUser, password, ...data } = user

        return data
    }
    
}