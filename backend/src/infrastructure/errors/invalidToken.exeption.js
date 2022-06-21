const InfrastructureFormatException = require('./infrastructureFormat.exception')

module.exports = class InvalidTokenException extends InfrastructureFormatException {
    constructor() {
        super('Invalid bearer')
    }
}