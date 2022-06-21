const ApplicationConflictException = require('./applicationConflict.exception')

module.exports = class IdAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('The ID is already in use')
    }
}