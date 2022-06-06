const DomainFormatException = require("./domainFormat.exception");

module.exports = class InvalidNameFormatException extends DomainFormatException {
    constructor() {
        super('Formato de nombre inválido')
    }
}