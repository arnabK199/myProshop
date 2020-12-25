const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const morgan = require('morgan')

const productRoute = require('./routes/ProductRoutes')
const userRoute = require('./routes/UserRoutes')
const orderRoute = require('./routes/OrderRoutes')
const uploadRoute = require('./routes/UploadRoutes')
const { notFound, errorHandler } = require('./middleware/ErrorMiddleware')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})


const folder = path.resolve();
app.use('/uploads', express.static(path.join(folder, '/uploads')));

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(folder, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(folder, 'frontend', 'build', 'index.html'))
    })

}else{
    app.get('/',(req, res)=>{
        res.send('App is Running')
    })
}

app.use(notFound)
app.use(errorHandler)


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const port = process.env.PORT || 4000

app.listen(port, console.log(`Server Running on ${process.env.NODE_ENV} mode on Port ${port}`.yellow.underline.bold));