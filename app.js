require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer')

const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const { storage, fileFilter } = require('./utils/image-config')
const cors = require('./utils/cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'))
app.use(cors)

app.use('/user', userRoute)
app.use('/product', productRoute)

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({ message })
})

app.use((req, res, next) => {

    res.status(404).json({
        error: 'bad request'
    })
})

module.exports = app;