const User = require('../models/UserModel')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')


// @desc: Route to Login the user and auth and provide a token to the user
// @route: /api/users/login
// @access: public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user &&  (await user.matchPassword(password))){
        return res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }

    res.status(401)
    throw new Error('Invalid email and password')
})

// @desc: Register a new User
// @route: /api/users
// @access: public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Bad Request. Please Provide all the fields')
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).send({message:'User already exists with this email'})
    }

    const user = new User({
        name,
        email,
        password
    })

    await user.save()

    return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
})

// @desc: Route to get Profile of a user
// @route: /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {

    return res.send({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin
    })
})

// @desc: Route to update the user's Detaols
// @route: /api/users/profile
// @access: Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password

        const updateUser = await user.save() 

        return res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })
    }

    res.status(404)
    throw new Error('User Not Found')
})

// @desc: Get all users
// @route: /api/users
// @access: Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

// @desc: Delete a user by ID
// @route: /api/users/:id
// @access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error('No User Found')
    }

    await user.remove()
    res.send({message:'User Successfully Deleted'})
})

// @desc: Get a user by ID
// @route: /api/users/:id
// @access: Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(!user){
        res.status(404)
        throw new Error('No User Found')
    }

    res.send(user)
})

// @desc: Update an user by if
// @route: PUT /api/users/:id
// @access: Private
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updateUser = await user.save() 

        return res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })
    }

    res.status(404)
    throw new Error('User Not Found')
})

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUserById
}