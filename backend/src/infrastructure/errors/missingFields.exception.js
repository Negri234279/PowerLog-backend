const InfrastructureFormatException = require('./infrastructureFormat.exception')

module.exports = class MissingFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Missing fields format')
    }
}