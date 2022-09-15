const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const jwt = require('../utils/sign-jwt')

exports.signup = (req, res, next) => {
    const body = req.body
    bcrypt.hash(body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({
                error
            })
        } else {
            const user = new User({
                id: new mongoose.Types.ObjectId,
                username: body.username,
                password: hash,
                name: body.name,
                phone: body.phone
            })
        
            user.save()
            .then(result => {
                console.log('User created successfully')
        
                res.status(200).json( {
                    message: 'User created successfully',
                    data: result
                })
            })
            .catch(error => {
                console.log('error creating user')
                console.log(error)
                
                res.status(500).json({
                    error
                })
            })

        }
    })
}

exports.login = (req, res, next) => {
    console.log('POST login user')
    const body = req.body
    User.find({username: body.username})
    .exec()
    .then(result => {
        console.log('User matched')
        if (result.length < 1) {
            return res.status(404).json({
                error: 'user not found'
            })
        }
        const user = result[0]
        bcrypt.compare(body.password, user.password, (error, result) => {
            if (!result) {
                return res.status(401).json({
                    error: 'incorrect password'
                })
            }

            if (result) {
                const token = jwt.sign(user)

                res.status(200).json({
                    accessToken: token
                })
            }
        })

    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
}