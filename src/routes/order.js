const { Router } = require('express')
const { Cart } = require('../models/Cart')
const { Order } = require('../models/Order')
const { Product } = require('../models/Product')
const { verifyAuthToken } = require('../utils/verifyToken')

const orderRouter = new Router()

orderRouter.post('/',verifyAuthToken,async(req,res)=>{
    const userCart = await Cart.findOne({user:req.user["_id"]})
    if(!userCart) return res.status(400).json({message:'No cart found'})
    const productIds = []
    userCart.products.forEach(async prod => {
        const m = prod.product
        productIds.push(m)
    });
    const productsOrdered = await Product.find({_id:productIds});
    // check if we have enough inventory
    const outOfStocks = []
    let totalPrice = 0;
    await productsOrdered.forEach(async (prod)=>{
        const inCart = userCart.products.filter(p => p.product == prod.id)[0]
        totalPrice += prod.price*inCart.quantity
        if(inCart.quantity > prod.quantity){
            outOfStocks.push(prod.name)
        }
        // if no item was out of stock, decrease qunatity
        if(outOfStocks.length === 0){
            await prod.update({quantity: prod.quantity - inCart.quantity})
            
        }
    })
    
    if(outOfStocks.length != 0){
        return res.json({message:'Some products are out of stock',outOfStockItems:outOfStocks.join(',')})
    }
    try {
        console.log(totalPrice);
        const newOrder = await Order({user:req.user["_id"],items:userCart.products,totalPrice}).save()
        await userCart.delete()
        return res.json({message:'Order successful',orderId:newOrder.id,totalPrice})
    } catch (error) {
        res.status(500).json({error})
    }
    
})

module.exports = {orderRouter}