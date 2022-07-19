import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
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