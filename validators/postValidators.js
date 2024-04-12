const Joi = require("@hapi/joi")

const PostSchemaValidator = Joi.object({
    titulo: Joi.string().max(120).required(),
    texto: Joi.string().max(500).required()
})

module.exports = PostSchemaValidator;