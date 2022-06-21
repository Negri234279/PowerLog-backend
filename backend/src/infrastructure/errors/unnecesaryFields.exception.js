const InfrastructureFormatException = require('./infrastructureFormat.exception')

module.exports = class UnnecesaryFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Unnecessary fields format')
    }
}