import { DomainFormatException } from './domainFormat.exception.js'

export class InvalidPasswordFormatException extends DomainFormatException {
    constructor() {
        super('Formato de contraseña inválido')
    }
}