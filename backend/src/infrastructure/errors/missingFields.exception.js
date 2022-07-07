import { InfrastructureFormatException } from './infrastructureFormat.exception.js'

export class MissingFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Missing fields format')
    }
}