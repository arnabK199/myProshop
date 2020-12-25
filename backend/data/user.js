const bcrypt = require('bcryptjs')

const user = [
    {
        name: 'Admin User',
        email:'admin@test.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Arnab Kundu',
        email:'arnab@test.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Maya User',
        email:'maya@test.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Prashant User',
        email:'prashant@test.com',
        password: bcrypt.hashSync('123456', 10)
    },
]

module.exports = user