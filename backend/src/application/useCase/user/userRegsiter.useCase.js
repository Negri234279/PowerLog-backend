const UserModel = require("../../../domain/models/user.model")
const EmailAlreadyInUseException = require("../../errors/emailAlreadyInUse.exception")
const IdAlreadyInUseException = require("../../errors/idAlreadyInUse.exception")

module.exports = class userRegisterUseCase  {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(id, name, email, password) {
        const newUser = await UserModel.createRegister(id, name, email, password)

        const existUserById = await this.userRepository.findById(id)
        if (existUserById) throw new IdAlreadyInUseException()

        const existUserByEmail = await this.userRepository.findByEmail(email)
        if (existUserByEmail) throw new EmailAlreadyInUseException()

        await this.userRepository.create(newUser)
    }
}