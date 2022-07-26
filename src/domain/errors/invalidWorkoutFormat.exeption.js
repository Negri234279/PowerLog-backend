import { DomainFormatException } from './domainFormat.exception.js'

export class InvalidWorkoutFormatException extends DomainFormatException {
    constructor() {
        super('Invalid workout format')
    }
}