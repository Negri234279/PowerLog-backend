import { UserModel } from '../../../domain/models/user.model.js'
import { VOUuid } from '../../../domain/valueObject/shared/uuid.vo.js'
import { VOEmail } from '../../../domain/valueObject/user/email.vo.js'
import { VOName } from '../../../domain/valueObject/user/name.vo.js'
import { VOPassword } from '../../../domain/valueObject/user/password.vo.js'
import { IdAlreadyInUseException } from '../../errors/shared/idAlredyInUse.exeption.js'
import { UserEmailAlreadyInUseException } from '../../errors/user/userEmailAlredyInUse.exeption.js'

export class userRegisterUseCase  {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(id, name, email, password) {
        const userId = new VOUuid(id)
        const userEmail = new VOEmail(email)

        const newUser = new UserModel(
            userId,
            new VOName(name),
            userEmail,
            await VOPassword.create(password)
        )

        const existUserById = await this.userRepository.findById(userId)
        if (existUserById) throw new IdAlreadyInUseException()

        const existUserByEmail = await this.userRepository.findByEmail(userEmail)
        if (existUserByEmail) throw new UserEmailAlreadyInUseException()

        await this.userRepository.create(newUser)
    }
}