const { verifyAuthToken } = require("../utils/verifyToken")

const {Router} = module.require('express')

const categoryRouter = Router()

categoryRouter.get('/',(req,res)=>{
    res.json({ok:true})
})

categoryRouter.post('/',verifyAuthToken,(req,res)=>{
    res.json({ok:"works"})
})

module.exports = {categoryRouter}