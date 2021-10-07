const {Schema,model} = require('mongoose')

const categorySchema = new Schema({
    name:{type:String,required:true}
})

const Category = model('categories',categorySchema)

module.exports = {Category}