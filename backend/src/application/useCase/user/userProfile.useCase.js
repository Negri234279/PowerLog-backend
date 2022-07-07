import { UserModel } from '../../../domain/models/user.model.js'
import { UserCredentialException } from '../../errors/userCredential.exeption.js'

export class userProfileUseCase {
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