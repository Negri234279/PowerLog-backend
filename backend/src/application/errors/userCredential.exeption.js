const ApplicationConflictException = require("./applicationConflict.exception")

module.exports = class UserCredentialException extends ApplicationConflictException {
    constructor() {
        super('Las credenciales son incorrectas')
    }
}