const { verify, sign } = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/common");

const signAsync = (payload, signOptions) =>
    new Promise((resolve, reject) => {
        sign(payload, JWT_SECRET_KEY, signOptions, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        });
    });

const verifyAsync = (token) =>
    new Promise((resolve, reject) => {
        verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) reject(err)
            else resolve(payload)
        })
    })


module.exports = {
    signAsync,
    verifyAsync
}