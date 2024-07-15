const Joi = require("@hapi/joi")

const FreteValidator = Joi.object({
motorista: Joi.string().max(200).required(),
inicioJornada:Joi.string().max(200).required(),
fazenda:Joi.string().max(200).required(),
jornadaAcumulada:Joi.string().max(200).required(),
fimJornada:Joi.string().max(200).required(),
placa:Joi.string().max(200).required(),
kmInicio:Joi.number().min(0).required(),
kmFim:Joi.number().min(0).required(),
abastecimento:Joi.number().min(0).required(),
})

module.exports = FreteValidator;