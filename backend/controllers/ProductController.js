const Product = require('../models/ProductModel')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')


// @desc: Get all the Products
// @route: /api/products
// @access: public
const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
    
    const keywordQuery = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keywordQuery})
    const products = await Product.find({...keywordQuery}).limit(pageSize).skip(pageSize * (page - 1))

    res.send({products, page, pages:Math.ceil(count / pageSize)})
})


// @desc: Get Product by Id
// @route: /api/products/:id
// @access: public
const getProductsById = asyncHandler(async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        //Check that our MongoDB id is valid
        res.status(400).json({ message: 'Invalid MongoDB ObjectId. Cannot find matching products with the ID.' })
    }

    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc: Delete Product by Id
// @route: /api/products/:id
// @access: private / Admin
const deleteProductById = asyncHandler(async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        //Check that our MongoDB id is valid
        res.status(400).json({ message: 'Invalid MongoDB ObjectId. Cannot find matching products with the ID.' })
    }

    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }

    await product.remove()
    res.json({message:'Product Successfully Deleted !'})
})

// @desc: Create a Sample Product
// @route: /api/products
// @access: private / Admin
const createProduct = asyncHandler(async(req, res) => {

    const product = new Product({
        name:'Sample Name',
        price:0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand:'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).send(createdProduct)
})

// @desc: Update a Product
// @route: /api/products/:id
// @access: private / Admin
const updateProduct = asyncHandler(async(req, res) => {

    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('Product Not Found')
    }

    product.name = req.body.name
    product.price = req.body.price
    product.description = req.body.description
    product.image = req.body.image
    product.brand = req.body.brand
    product.category = req.body.category
    product.countInStock = req.body.countInStock

    const updatedProduct = await product.save()
    res.send(updatedProduct)
})

// @desc: Add a review for the Product
// @route: /api/products/:id/reviews
// @access: private
const addProductReview = asyncHandler(async(req, res) => {

    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('Product Not Found')
    }

    product.reviews.map(review => {
        if(review.user.toString() === req.user._id.toString()){
            res.status(400)
            throw new Error('Product Review Already Added')
        }
    })

    const newReview = {
        name:req.user.name,
        rating:Number(rating),
        comment,
        user: req.user._id
    }

    product.reviews.push(newReview)
    product.numReviews = product.reviews.length

    product.rating = (product.reviews.reduce((acc, r) => r.rating + acc, 0)) /product.reviews.length

    await product.save()
    res.status(201).send({message:'Review Added'})
})

// @desc: Get Top Products
// @route: /api/products/top
// @access: Public
const getTopProducts = asyncHandler(async(req, res) => {

    const products = await Product.find({}).sort({rating: -1}).limit(3)

    res.send(products)
})

module.exports = {
    getProducts,
    getProductsById,
    deleteProductById,
    createProduct,
    updateProduct,
    addProductReview,
    getTopProducts
}