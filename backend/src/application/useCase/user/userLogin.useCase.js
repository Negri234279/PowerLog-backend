const { compare } = require('bcrypt') 
const UserModel = require("../../../domain/models/user.model")
const UserCredentialException = require("../../errors/userCredential.exeption")

class userLoginUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(email, password) {
        await UserModel.createLogin(email, password)

        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new UserCredentialException()

        const vallidPassword = await compare(password, user.password)
        if (!vallidPassword) throw new UserCredentialException()

        return user.id
    }
}

module.exports = userLoginUseCase