const express = require('express')

const productController = require('../controllers/product')
const checkAuth = require('../middleware/check-auth')
const validator = require('../middleware/validator')

const router = express.Router()

// GET all products
router.get('/', checkAuth, productController.getAllProducts)

// GET product by name
router.get('/:name', checkAuth, productController.getProductByName)

// POST add product
router.post('/', checkAuth, validator.productInput, productController.addProduct)

// PUT product by id
router.put('/:id', checkAuth, validator.productInput, productController.updateProductById)

// DELETE product by id
router.delete('/:id', checkAuth, productController.deleteProductById)

module.exports = router