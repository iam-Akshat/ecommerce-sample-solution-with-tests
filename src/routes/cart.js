const {Router} = require('express');
const {verifyAuthToken} = require('../utils/verifyToken')
const {User} = require('../models/User')
const {Cart} = require('../models/Cart')
const cartRouter = new Router()

cartRouter.get('/',verifyAuthToken,async (req,res)=>{
    try {
        const cart = await Cart.findOne({user:req.user["_id"]})
        if(cart){
            return res.json({cart:cart.toJSON()})
        }else{
            return res.json({cart:[]})
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({error})
    }
    
})
cartRouter.post('/',verifyAuthToken,async (req,res)=>{
    
    const {productIds} = req.body
    if(!productIds) return res.status(400).json({error:"Need atleast one product id"})
    const cart = await Cart.findOne({user:req.user["_id"]})
    if(cart){
        for(let x=0;x<productIds.length;x++){
            cart.products.forEach((prod,idx)=>{
                if(prod.product == productIds[x].product){
                    cart.products[idx].quantity += productIds[x].quantity
                }else{
                    cart.products.push(productIds[x])
                }
            })
        }
        const newCart = await cart.save()
        return res.json({newCart})  
    }
    const newCart = new Cart()
    newCart.user = req.user["_id"]
    newCart.products.push(...productIds)
    await newCart.save()
    return res.json({newCart})
})

module.exports = {cartRouter}