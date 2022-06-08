const InfrastructureFormatException = require('./infrastructureFormat.exception')

module.exports = class UnnecesaryFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Existen campos sobrantes')
    }
}