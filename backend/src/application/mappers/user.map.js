import { UserModel } from '../../domain/models/user.model.js'

export class UserMap {
    /**
    * Transforms a database user into a domain user
    * @param {UserModel} domainModel Database user
    * @returns Domain user
    */
    static toDTO(domainModel) {
        const { id, name, email, password } = domainModel
        
        return {
            id: id._value,
            name: name._value,
            email: email._value,
            password: password._value
        }
    }
}