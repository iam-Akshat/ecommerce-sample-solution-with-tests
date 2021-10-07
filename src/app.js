const express = require('express');
const { categoryRouter } = require('./routes/category');
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

module.exports = app;
