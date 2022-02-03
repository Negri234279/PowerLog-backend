const { findUserByEmail, createUser, cryptPassword } = require('../utils/Auth')
const jwtGenerator = require('../utils/jwtGenerator')

const registerUser = async (req, res, next) => {
    const { email, name, password } = req.body

    try {
        const userFound = await findUserByEmail(email)
		if (userFound.rows.length > 0) return res.status(401).json('User already exist!')

        const cryptPasswd = await cryptPassword(password)

        const newUser = await createUser(name, email, cryptPasswd)

        const jwtToken = jwtGenerator(newUser.rows[0].id_user)

        return res.json(jwtToken)
    } catch (error) {
		res.status(500).send('Server error')
        next(error)
    }
}

module.exports = { registerUser }