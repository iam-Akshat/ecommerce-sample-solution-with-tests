const express = require('express');
const { cartRouter } = require('./routes/cart');
const { categoryRouter } = require('./routes/category');
const { orderRouter } = require('./routes/order');
const { productRouter } = require('./routes/product');
require('dotenv').config()
const { userRouter } = require('./routes/user');
const app = express();


// Import routes


//Router MIddlewares
app.use(express.json());
app.use('/auth',userRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)

module.exports = app;
