require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.sign = payload => {
    const tokenSecret = process.env.JWT_SECRET
    return token = jwt.sign({
        username: payload.username,
        name: payload.name,
        phone: payload.phone
    },
        tokenSecret,
        { expiresIn: "24h" }
    )
}