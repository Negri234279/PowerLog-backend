import { InfrastructureFormatException } from './infrastructureFormat.exception.js'

export class UnnecesaryFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Unnecessary fields format')
    }
}