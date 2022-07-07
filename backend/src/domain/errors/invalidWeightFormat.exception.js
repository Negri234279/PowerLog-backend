import { DomainFormatException } from './domainFormat.exception.js'

export class InvalidWeightFormatException extends DomainFormatException {
    constructor() {
        super('Formato del peso inválido')
    }
}