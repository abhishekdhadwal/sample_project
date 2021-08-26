import Joi from 'joi';

const admin_login =  Joi.object({
      email : Joi.string().email().required().description("Enter your Email Address"),
      password : Joi.string().required().description("Enter your Password")
})


export {
      admin_login
}