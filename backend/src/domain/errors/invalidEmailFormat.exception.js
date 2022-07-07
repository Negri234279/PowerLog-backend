import { DomainFormatException } from './domainFormat.exception.js'

export class InvalidEmailFormatException extends DomainFormatException {
    constructor() {
        super('Formato de email inválido')
    }
}