import { VOFormatException } from '../../../domain/errors/voFormat.exeption.js'
import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { VOPlainPassword } from '../../../domain/valueObject/user/plainPassword.vo.js'
import { IdAlreadyInUseException } from '../../errors/shared/idAlredyInUse.exeption.js'

export class userProfileUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(id) {
        const userId = new VOUuid(id)

        const user = await this.userRepository.findById(userId)
        // if (!user) throw new IdAlreadyInUseException()

        const { email, name } = user

        return { email: email._value , name: name._value }
    }
    
}