import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'

export const generateToken = async (id) => {
    const payload = { id }
    const signOptions = { algorithm: 'HS512', expiresIn: '7d' }

    const signAsync = (payload, signOptions) =>
        new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET_KEY, signOptions, (err, token) => {
                if (err) reject(err)
                else resolve(`Bearer ${token}`)
            })
        })

    return await signAsync(payload, signOptions)
    
}