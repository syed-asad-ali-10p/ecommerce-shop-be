const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    try {
        const tokenSecret = process.env.JWT_SECRET
        const token = req.headers.authorization.split(" ")[1]
        console.log('Authorization token ' + token)

        const tokenResult = jwt.verify(token, tokenSecret)
        console.log('token result ' + tokenResult)
        
        next()
    }
    catch (error) {
        res.status(401).json({
            error: 'User not authorized'
        })

    }
}

module.exports = verifyJWT