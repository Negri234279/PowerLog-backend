import { DomainFormatException } from './domainFormat.exception.js'

export class InvalidIdFormatException extends DomainFormatException {
    constructor() {
        super('Formato de ID inválido')
    }
}