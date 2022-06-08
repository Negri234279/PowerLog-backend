const InfrastructureFormatException = require('./infrastructureFormat.exception')

module.exports = class MissingFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Faltan campos obligatorios')
    }
}