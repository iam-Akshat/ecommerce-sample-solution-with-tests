const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(50).required(),
  });
  // Lets validate the user's data
  return schema.validate(data);
};
// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).max(50).required(),
  });
  // Lets validate the user's data
  return schema.validate(data);
};
const categoryValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    })
    return schema.validate(data)
}
const productValidation = (data) =>{
    const schema = Joi.object({
        name:Joi.string().min(2).required(),
        price:Joi.number().min(0).required(),
        quantity:Joi.number().min(0).required(),
        category:Joi.string().required()
    })

    return schema.validate(data)
}
module.exports = {loginValidation,registerValidation,categoryValidation,productValidation}