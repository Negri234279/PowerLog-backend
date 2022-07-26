import { ApplicationConflictException } from '../applicationConflict.exception.js'

export class UserEmailAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('The email is already in use')
    }
}