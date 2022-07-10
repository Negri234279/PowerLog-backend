import { VOFormatException } from '../../../domain/errors/voFormat.exeption.js'
import { VOEmail } from '../../../domain/valueObject/user/email.vo.js'
import { VOPlainPassword } from '../../../domain/valueObject/user/plainPassword.vo.js'
import { InvalidLoginException } from '../../errors/user/invalidLogin.exeption.js'

export class userLoginUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute(email, password) {
        try {
            const userEmail = new VOEmail(email)
            const userPassword = new VOPlainPassword(password)
            
            const user = await this.userRepository.findByEmail(userEmail)
            if (!user) throw new InvalidLoginException()

            const validPassword = await user.password.compare(userPassword)
            if (!validPassword) throw new InvalidLoginException()
            
            return user.id
            
        } catch (error) {
            if (error instanceof VOFormatException)
                throw new InvalidLoginException()
                
            throw error
        }
    }
}