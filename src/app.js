const express = require('express');
const app = express();


// Import routes


//Router MIddlewares
app.use(express.json());


module.exports = app;
