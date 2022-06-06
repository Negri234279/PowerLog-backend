const DomainFormatException = require("./domainFormat.exception");

module.exports = class InvalidWeightFormatException extends DomainFormatException {
    constructor() {
        super('Formato del peso inválido')
    }
}