const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        max:50,
        min:6
    },
    email:{
        type:String,
        required:true,
        max:50,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:50,
        min:6
    }
})

const User = mongoose.model('users',userSchema)
module.exports = {User}