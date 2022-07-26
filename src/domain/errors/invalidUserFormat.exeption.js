import { DomainFormatException } from './domainFormat.exception.js'

export class InvalidUserFormatException extends DomainFormatException {
    constructor() {
        super('Invalid user format')
    }
}