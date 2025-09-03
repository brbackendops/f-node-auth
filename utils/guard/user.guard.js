const joi = require('joi')


const userCreationSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().required(),
    password: joi.string().required()
});


const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});



module.exports = {
    userCreationSchema,
    userLoginSchema
}