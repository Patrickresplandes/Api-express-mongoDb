const Joi = require("@hapi/joi")

const ComentarioSchemaValidator = Joi.object({
    texto: Joi.string().max(500).required()
})

module.exports = ComentarioSchemaValidator;