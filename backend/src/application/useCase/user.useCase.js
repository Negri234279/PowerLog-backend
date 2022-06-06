const bcrypt = require('bcrypt'); 
const UserModel = require('../../domain/models/user.model');
const UserRepository = require("../../infrastructure/repositories/user.repository");
const ConflictException = require("../../shared/errors/conflict.exception");
const UnauthorizedException = require("../../shared/errors/unauthorized.exception")

const loginUserService = async (email, password) => {
    await UserModel.createLogin(email, password)

    const user = await UserRepository.findByEmail(email)
    if (!user) throw new UnauthorizedException('Las credenciales son incorrectas')

    const vallidPassword = await bcrypt.compare(password, user.password)
    if (!vallidPassword) throw new UnauthorizedException('Las credenciales son incorrectas')
        
    return user.id
}

module.exports = { loginUserService }