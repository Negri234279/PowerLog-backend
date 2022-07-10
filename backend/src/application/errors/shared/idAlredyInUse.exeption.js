import { ApplicationConflictException } from '../applicationConflict.exception.js'

export class IdAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('The ID is already in use')
    }
}