const { Router } = require('express')
const { Product } = require('../models/Product')
const { productValidation } = require('../utils/validation')
const { verifyIsAdmin } = require('../utils/verifyRole')
const { verifyAuthToken } = require('../utils/verifyToken')

const productRouter = new Router()

productRouter.get('/', async(req, res) => {
    try {
        const products = await Product.find({}).populate("category")
        return res.json({products})
    } catch (error) {
        return res.status(500).json({error})   
    }
})

productRouter.post('/',verifyAuthToken,verifyIsAdmin,async (req,res)=>{
    if(!req.isAdmin) return res.status(400).json({"message":"Access denied"})
    const {error} = productValidation(req.body)
    if(error) return res.status(400).json({error:error.details})
    const newProduct = new Product(req.body)
    try {
        await newProduct.save()
        return res.status(201).json({result:{...newProduct.toJSON()}})
    } catch (error) {
        return res.status(500).json({error})
    }
})

module.exports = { productRouter }