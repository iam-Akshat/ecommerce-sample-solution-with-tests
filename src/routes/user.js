const { User } = require("../models/User")
const { registerValidation, loginValidation } = require("../utils/validation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {Router} = module.require('express')

const generateAuthToken = (user_id) => {
    return jwt.sign({_id: user_id}, process.env.TOKEN_SECRET, {expiresIn: '24h'});
}

const userRouter = Router()

userRouter.post('/signup',async (req,res)=>{
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).json({error:error.details})
    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).json({error:"Email already in use by someone"})
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        fullName:req.body.fullName,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        return res.json({user: savedUser._id});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})
userRouter.post('/signin',async (req, res) =>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({message: error.details});
    // checking if the email exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: 'Email not found'});
    // password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({message: "password is wrong"})
    // create and assign a token
    const authToken = generateAuthToken(user._id);
   
    res.header('auth-token', authToken);
    return res.status(201).json({'auth-token': authToken,message:"User logged in successfully"});
})

module.exports = {userRouter}