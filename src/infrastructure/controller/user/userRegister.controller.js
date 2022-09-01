import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'
import { signAsync } from '../../utils/jwt.util.js'

export class userRegisterController {
    constructor({ userRegisterUseCase }) {
        this.userRegisterUseCase = userRegisterUseCase
    }

    async execute(req, res, next) {
        const { id, name, email, password, ...rest } = req.body

        try {
            if (!id || !name || !email || !password) throw new MissingFieldsFormatException()
            if (Object.keys(rest).length !== 0) throw new UnnecesaryFieldsFormatException()

            await this.userRegisterUseCase.execute(id, name, email, password)

            const payload = { id }
            const signOptions = { algorithm: 'HS512', expiresIn: '7d' }

            const token = await signAsync(payload, signOptions)

            return res.status(201).send(token)
        } catch (err) {
            next(err)
        }
    }
    
}