const { body } = require('express-validator')

exports.productInput = [body('name').trim().not().isEmpty(),
    body('price').trim().not().isEmpty().isNumeric(),
    body('description').trim().not().isEmpty()]