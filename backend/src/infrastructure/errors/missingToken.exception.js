const InfrastructureFormatException = require('./infrastructureFormat.exception')

module.exports = class MissingTokenException extends InfrastructureFormatException {
    constructor() {
        super('Missing bearer')
    }
}