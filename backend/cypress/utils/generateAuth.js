import jwt from 'jsonwebtoken'

export const generateToken = async (id) => {
    const payload = { id }
    const signOptions = { algorithm: 'HS512', expiresIn: '7d' }

    const signAsync = (payload, signOptions) =>
        new Promise((resolve, reject) => {
            jwt.sign(payload, 'token', signOptions, (err, token) => {
                if (err) reject(err)
                else resolve(`Bearer ${token}`)
            })
        })

    return await signAsync(payload, signOptions)
    
}