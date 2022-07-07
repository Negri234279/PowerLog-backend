import { compare } from 'bcrypt'
import { UserModel } from '../../../domain/models/user.model.js'
import { UserCredentialException } from '../../errors/userCredential.exeption.js'

export class userLoginUseCase {
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