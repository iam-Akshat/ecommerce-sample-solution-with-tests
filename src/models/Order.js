const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    ordered_by:{type:Schema.Types.ObjectId,ref:'users'},
    items:[{
        product:{type:Schema.Types.ObjectId,ref:'products'},
        quantity:Number
    }],
    totalPrice:Number,
    status:{
        type:Schema.Types.String,
        enum:["placed","delivered"],
        default:"placed"
    }
})

const Order = model('orders', orderSchema)

module.exports = { Order }