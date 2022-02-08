const { findUserById } = require("../utils/Auth")

const profileUser = async (req, res, next) => {
    try {
        const { idUser } = req.user

        const userFound = await findUserById(idUser)
        if (!userFound) return res.status(401).json('User not found')

        const { id_user, name, email } = userFound.rows[0]

        return res.send({ id_user, name, email })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    profileUser
}