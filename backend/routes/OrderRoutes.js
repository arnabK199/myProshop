const express = require('express')
const {createOrder, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered} = require('../controllers/OrderController')
const {authmiddleware, isAdmin} = require('../middleware/AuthMiddleware')

const router = express.Router()

router.post('/', authmiddleware, createOrder)
router.get('/', authmiddleware, isAdmin, getAllOrders)
router.get('/myorders', authmiddleware, getMyOrders)
router.get('/:id', authmiddleware, getOrderById)
router.put('/:id/pay', authmiddleware, updateOrderToPaid)
router.put('/:id/deliver', authmiddleware, updateOrderToDelivered)

module.exports = router