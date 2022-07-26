import { MissingFieldsFormatException } from '../../errors/missingFields.exception.js'
import { UnnecesaryFieldsFormatException } from '../../errors/unnecesaryFields.exception.js'

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

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }
    
}