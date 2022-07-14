import { VOFormatException } from '../../../domain/errors/voFormat.exeption.js'
import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { VOPlainPassword } from '../../../domain/valueObject/user/plainPassword.vo.js'
import { IdAlreadyInUseException } from '../../errors/shared/idAlredyInUse.exeption.js'
import { UserMap } from '../../mappers/user.map.js'

export class userProfileUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(id) {
        const userId = new VOUuid(id)

        const user = await this.userRepository.findById(userId)
        // if (!user) throw new IdAlreadyInUseException()

        const { name, email } = UserMap.toDTO(user)
        
        return { name, email }
    }
    
}