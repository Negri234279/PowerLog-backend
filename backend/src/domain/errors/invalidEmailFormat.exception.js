const DomainFormatException = require('./domainFormat.exception')

module.exports = class InvalidEmailFormatException extends DomainFormatException {
    constructor() {
        super('Formato de email inválido')
    }
}