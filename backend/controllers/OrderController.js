const Order = require('../models/OrderModel')
const asyncHandler = require('express-async-handler')

// @desc: Create an Order
// @route: /api/orders
// @access: private
const createOrder = asyncHandler(async (req, res) => {
    
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No Order Items Found')
    }

    const newOrder = await new Order({
        orderItems, 
        user: req.user._id,
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice})

    const createdOrder = await newOrder.save()

    res.status(201).send(createdOrder)
})

// @desc: Get an order by Id
// @route: /api/orders/:id
// @access: private
const getOrderById = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        res.status(404)
        throw new Error('Order Not found')
    }

    res.send(order)
})

module.exports = {createOrder, getOrderById}

// @desc: Update Order To Paid
// @route: /api/orders/:id/pay
// @access: private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id)

    if(!order){
        res.status(404)
        throw new Error('Order Not found')
    }

    order.isPaid = true
    order.paidAt = Date.now()
    // order.paymentResult = {
    //     id: req.body.id,
    //     status: req.body.status,
    //     update_time: req.body.update_time,
    //     email_address: req.body.payer.email_address
    // }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
})

// @desc: Update Order To Delivered
// @route: /api/orders/:id/deliver
// @access: private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id)

    if(!order){
        res.status(404)
        throw new Error('Order Not found')
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
})

// @desc: Get all orders for the logged in user
// @route: /api/orders/myorders
// @access: private
const getMyOrders = asyncHandler(async (req, res) => {
    
    const orders = await Order.find({user: req.user._id})

    if(orders.length === 0){
        res.status(404)
        throw new Error('No Order found')
    }

    res.send(orders)
})

// @desc: Get all orders
// @route: /api/orders
// @access: private/admin
const getAllOrders = asyncHandler(async (req, res) => {
    
    const orders = await Order.find({}).populate('user', '_id name')
    res.send(orders)
})

module.exports = {createOrder, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered}