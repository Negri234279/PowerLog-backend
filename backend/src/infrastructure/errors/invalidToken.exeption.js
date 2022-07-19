import { InfrastructureFormatException } from './infrastructureFormat.exception.js'

export class InvalidTokenException extends InfrastructureFormatException {
    constructor() {
        super('Invalid bearer')
    }
}