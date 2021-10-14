const {Schema,model} = require('mongoose')

const cartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    products:[{
        product: {type:Schema.Types.ObjectId,required:true,ref:'products'},
        quantity:{type:Schema.Types.Number,default:1}
    }]
})

const Cart = model('carts',cartSchema)

module.exports = {Cart}