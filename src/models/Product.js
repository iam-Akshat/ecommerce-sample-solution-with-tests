const {Schema,model} = require('mongoose')

const productSchema = new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true,min:0},
    quantity:{type:Number,required:true,min:0},
    category:{
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
})

const Product = model('products',productSchema)

module.exports = {Product}