import { InfrastructureFormatException } from './infrastructureFormat.exception.js'

export class MissingTokenException extends InfrastructureFormatException {
    constructor() {
        super('Missing bearer')
    }
}