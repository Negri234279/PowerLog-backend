import { JWT_SECRET_KEY } from '../config/common.js'
import jwt from 'jsonwebtoken'

export const signAsync = (payload, signOptions) =>
    new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET_KEY, signOptions, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    })

export const verifyAsync = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) reject(err)
            else resolve(payload)
        })
    })
