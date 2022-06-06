const ApplicationConflictException = require("./applicationConflict.exception")

module.exports = class UserIdAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('El ID de usuario ya está en uso')
    }
}