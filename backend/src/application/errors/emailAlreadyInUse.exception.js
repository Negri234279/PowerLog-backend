const ApplicationConflictException = require('./applicationConflict.exception')

module.exports = class EmailAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('The email is already in use')
    }
}