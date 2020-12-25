const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

const jwt = require('jsonwebtoken')

const authmiddleware = asyncHandler(async (req, res, next) => {
    
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else{
        res.status(401)
        throw new Error('Not Authorized, Please provide a valid Token')
    }

    const decodedData = jwt.decode(token)
    
    if(!decodedData){
        res.status(401)
        throw new Error('Not Authorized, Please provide a valid Token')
    }

    const user = await User.findById(decodedData.id)

    if(!user){
        res.status(401)
        throw new Error('Not Authorized, Please provide a valid Token')
    }

    req.user = user
    next()
})

const isAdmin = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.isAdmin === true){
        next()
    }else{
        res.status(401)
        throw new Error('Not Authorised as Admin')
    }
})

module.exports = {authmiddleware, isAdmin}