const DomainFormatException = require("./domainFormat.exception")

module.exports = class InvalidPasswordFormatException extends DomainFormatException {
    constructor() {
        super('Formato de contraseña inválido')
    }
}