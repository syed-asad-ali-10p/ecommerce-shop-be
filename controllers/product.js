const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const fs = require('fs')

const Product = require('../models/product')

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(200).json({
                data: {
                    count: products.length,
                    products
                }
            })
        })
        .catch(error => onError(error, next))
}

exports.getProductByName = (req, res, next) => {
    const name = req.params.name
    Product.find({ name })
        .then(products => {
            console.log('Find product by name')
            console.log(products.length)
            if (products.length === 0) {
                const error = new Error('Could not find product')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({
                data: {
                    count: products.length,
                    products
                }
            })
        })
        .catch(error => onError(error, next))
}

exports.addProduct = (req, res, next) => {
    const { name, price, description } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw validationError('Validation failed, entered data in incorrect.')
    }
    
    const image = req.file
    if (!image) {
        throw invalidImageError('Please provide valid image')
    }
    
    const product = new Product({
        name,
        price,
        description,
        imageUrl: image.path
    })

    product.save()
        .then(product => {
            res.status(201).json({
                data: product
            })
        })
        .catch(error => onError(error, next))
}

exports.updateProductById = (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const image = req.file

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw validationError('Validation failed, entered data in incorrect.')
    }

    if (!image) {
        throw invalidImageError('Please provide valid image')
    }
    
    Product.findById(id).then(product => {
        if (!product) {
            const error = new Error('Could not find product')
            error.statusCode = 404
            throw error
        }

        product.name = body.name
        product.price = body.price
        product.description = body.description
        product.imageUrl = image.path
        return product.save()

    })
    .then(post => {
        res.send(200).json({
            data: post
        })
    })
    .catch(error => onError(error, next))
}

exports.deleteProductById = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log('Product deleted')

            res.status(200).json({
                data: result
            })
        })
        .catch(error => onError(error, next))
}

const validationError = message => {
    const error = new Error(message)
    error.statusCode = 422
    throw error
}

const invalidImageError = message => {
    const error = new Error(message)
    error.statusCode = 422
    throw error
}

const onError = (error, next) => {
    if (!error.statusCode) {
        error.statusCode = 500
    }
    next(error)
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => console.log(err))
}