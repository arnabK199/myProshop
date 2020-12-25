const express = require('express')
const {getProducts, getProductsById, deleteProductById, createProduct, updateProduct, addProductReview, getTopProducts} = require('../controllers/ProductController')
const {authmiddleware, isAdmin} = require('../middleware/AuthMiddleware')

const router = express.Router()

router.get('/',getProducts)

router.get('/top',getTopProducts)

router.get('/:id',getProductsById)

router.post('/:id/reviews',authmiddleware, addProductReview)

router.delete('/:id', authmiddleware, isAdmin, deleteProductById)

router.post('/', authmiddleware, isAdmin, createProduct)

router.put('/:id', authmiddleware, isAdmin, updateProduct)

module.exports = router
