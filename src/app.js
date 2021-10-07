const express = require('express');
const { categoryRouter } = require('./routes/category');
require('dotenv').config()
const { userRouter } = require('./routes/user');
const app = express();


// Import routes


//Router MIddlewares
app.use(express.json());
app.use('/auth',userRouter)
app.use('/category',categoryRouter)

module.exports = app;
