const { Category } = require("../models/Category")
const { categoryValidation } = require("../utils/validation")
const { verifyIsAdmin } = require("../utils/verifyRole")
const { verifyAuthToken } = require("../utils/verifyToken")

const {Router} = module.require('express')

const categoryRouter = Router()

categoryRouter.get('/',async (req,res)=>{
    try {
        const categories = await Category.find({})
        return res.json({categories})
    } catch (error) {
        return res.status(500).json({error})
    }
})

categoryRouter.post('/',verifyAuthToken,verifyIsAdmin,async(req,res)=>{
    if(!req.isAdmin) return res.status(400).json({"message":"Access denied"})
    const {error} = categoryValidation(req.body)
    if(error) return res.status(400).json({error:error.details})
    const newCategory = new Category(req.body)

    try {
        await newCategory.save()
        return res.status(201).json({message:"Success",result:{...newCategory.toJSON()}})
    } catch (error) {
        return res.status(500).json({error})
    }
    
})

module.exports = {categoryRouter}