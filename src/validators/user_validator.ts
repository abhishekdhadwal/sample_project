
import Joi from 'joi';

const signup =  Joi.object({
   name : Joi.string().required().description("Enter your Name"),
   email : Joi.string().email().required().description("Enter your Email Address"),
   password : Joi.string().required().description("Enter your Password")
})

const login =  Joi.object({
   email : Joi.string().email().required().description("Enter your Email Address"),
   password : Joi.string().required().description("Enter your Password")
})

export {
   signup,
   login
}