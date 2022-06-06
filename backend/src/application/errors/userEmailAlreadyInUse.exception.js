const ApplicationConflictException = require("./applicationConflict.exception")

module.exports = class UserEmailAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('El email ya está en uso')
    }
}