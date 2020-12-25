const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const users = require('./data/user')
const products = require('./data/products')
const User = require('./models/UserModel')
const Product = require('./models/ProductModel')
const Order = require('./models/OrderModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
        // Delete Existing records if any
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        // Add the Data into the DB
        const allUsers = await User.insertMany(users)

        const adminUserId = allUsers[0]._id

        const sampleProducts = products.map(p => {
            return { ...p, user:adminUserId}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported !!'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
    }
}

const deleteData = async () => {
    try {
        // Delete Existing records if any
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log('Data Deleted !!'.red.inverse)
    } catch (error) {
        console.log(`${error.message}`.red.underline.bold)
    }
}

if(process.argv[2] === '-d'){
    deleteData()
}else{
    importData()
}