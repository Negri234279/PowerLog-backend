const DomainFormatException = require("./domainFormat.exception");

module.exports = class InvalidIdFormatException extends DomainFormatException {
    constructor() {
        super('Formato de ID inválido')
    }
}