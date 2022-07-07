import { ApplicationConflictException } from './applicationConflict.exception.js'

export class EmailAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('The email is already in use')
    }
}