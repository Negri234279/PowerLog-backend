import { UserModel } from '../../../domain/models/user.model.js'
import { EmailAlreadyInUseException } from '../../errors/emailAlreadyInUse.exception.js'
import { IdAlreadyInUseException } from '../../errors/idAlreadyInUse.exception.js'

export class userRegisterUseCase  {
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