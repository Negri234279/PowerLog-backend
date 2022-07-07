import { ApplicationConflictException } from './applicationConflict.exception.js'

export class UserCredentialException extends ApplicationConflictException {
    constructor() {
        super('The credentials are incorrect')
    }
}