const Joi = require("@hapi/joi")

const AuthSchemaValidator = Joi.object ({
    email: Joi.string().email().max(250).required(),
    senha: Joi.string().min(6).max(12).required()
})

module.exports = AuthSchemaValidator;