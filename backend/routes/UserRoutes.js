const express = require('express')
const {authUser, registerUser, getUserProfile, updateUser, getUsers, deleteUser, getUserById, updateUserById} = require('../controllers/UserController')
const {authmiddleware, isAdmin} = require('../middleware/AuthMiddleware')

const router = express.Router()

router.post('/', registerUser)

router.get('/', authmiddleware, isAdmin, getUsers)

router.post('/login', authUser)

router.get('/profile',authmiddleware, getUserProfile)

router.put('/profile',authmiddleware, updateUser)

router.delete('/:id', authmiddleware, isAdmin, deleteUser)

router.get('/:id', authmiddleware, isAdmin, getUserById)

router.put('/:id', authmiddleware, isAdmin, updateUserById)

module.exports = router