const bcrypt = require('bcrypt')
const pool = require('../db')
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

const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await findUserByEmail(email)
        if (user.rows.length === 0) return res.status(401).json("Invalid Credential")

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) return res.status(401).json("Invalid Credential")

        const jwtToken = jwtGenerator(user.rows[0].id_user)

        return res.json({ jwtToken })
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
        next(error)
    }
}

const verify = async (req, res, next) => {
    try {
        res.json(true)
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server error")
        next(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    verify
}